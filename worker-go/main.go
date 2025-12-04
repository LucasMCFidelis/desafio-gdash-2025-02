package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	configs "worker/src"
	server "worker/src/server"

	amqp "github.com/rabbitmq/amqp091-go"
)

var (
	rabbitURL = configs.GetEnv("RABBITMQ_URL")
	queueName = configs.GetEnv("QUEUE_NAME")
	apiURL    = configs.GetEnv("API_URL") + "/weather/logs"

	httpClient = &http.Client{
        Timeout: 15 * time.Second,
    }
)

type WeatherMessage struct {
	Timestamp   string  `json:"timestamp"`
	Location    string  `json:"location"`
	Condition   string  `json:"condition"`
	Temperature float64 `json:"temperature"`
	FeelsLike 	float64 `json:"feels_like"`
	Humidity    float64 `json:"humidity"`
}

func failOnError(err error, msg string) {
	if err != nil {
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

func connectWithRetry(url string, retries int, delay time.Duration) (*amqp.Connection, error) {
	var conn *amqp.Connection
	var err error

	for i := 0; i < retries; i++ {
		conn, err = amqp.Dial(url)
		if err == nil {
			return conn, nil
		}

		fmt.Printf("RabbitMQ not ready, retrying... (%d/%d)\n", i+1, retries)
		time.Sleep(delay)
	}

	return nil, err
}

func waitForAPI(apiURL string) error {
	client := &http.Client{
		Timeout: 90 * time.Second,
	}

	fmt.Printf("Waiting for API at %s...\n", apiURL)

	req, _ := http.NewRequest("GET", apiURL, nil)

	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("API failed to wake up: %w", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode >= 200 && resp.StatusCode < 500 {
		fmt.Println("API is ready!")
		return nil
	}

	return fmt.Errorf("API returned unexpected status: %d", resp.StatusCode)
}

func sendWeatherPost(msg WeatherMessage) error {
    jsonData, err := json.Marshal(msg)
    if err != nil {
        return err
    }

    maxRetries := 5
    backoff := 2 * time.Second

    for attempt := 1; attempt <= maxRetries; attempt++ {
        resp, err := httpClient.Post(apiURL, "application/json", bytes.NewBuffer(jsonData))
        if err == nil && resp.StatusCode >= 200 && resp.StatusCode < 300 {
            resp.Body.Close()
            return nil
        }

        if resp != nil {
            resp.Body.Close()
        }

        fmt.Printf("POST failed (attempt %d/%d). Retrying in %v...\n",
            attempt, maxRetries, backoff)

        time.Sleep(backoff)
        backoff *= 2
    }

    return fmt.Errorf("failed to POST after retries")
}


func main() {
	go server.Start()

	waitForAPI(configs.GetEnv("API_URL"))

	conn, err := connectWithRetry(rabbitURL, 10, 3*time.Second)
	failOnError(err, "connect rabbit")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "open channel")
	defer ch.Close()

	_, err = ch.QueueDeclare(
		queueName,
		true,  // durable
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "declare queue")

	msgs, err := ch.Consume(queueName, "", false, false, false, false, nil)
	failOnError(err, "consume queue")

	for d := range msgs {
		var msg WeatherMessage

		if err := json.Unmarshal(d.Body, &msg); err != nil {
			fmt.Println("Invalid message:", err)
			d.Nack(false, false)
			continue
		}

		if msg.Timestamp == "" || msg.Location == "" {
			fmt.Println("Missing required fields")
			d.Nack(false, false)
			continue
		}

		// envia POST para API
		if err := sendWeatherPost(msg); err != nil {
			fmt.Println("Failed to send POST:", err)
			d.Nack(false, true) // requeue
			continue
		}

		fmt.Printf("Successfully posted message: %+v\n", msg)
		d.Ack(false)
	}
}
