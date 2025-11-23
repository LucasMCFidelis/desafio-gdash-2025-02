package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	configs "worker/src"

	amqp "github.com/rabbitmq/amqp091-go"
)

var (
	rabbitURL = configs.GetEnv("RABBITMQ_URL")
	queueName = configs.GetEnv("QUEUE_NAME")
	apiURL    = configs.GetEnv("API_URL") + "/weather/logs"
)

type WeatherMessage struct {
	Timestamp   string  `json:"timestamp"`
	Location    string  `json:"location"`
	Condition   string  `json:"condition"`
	Temperature float64 `json:"temperature"`
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

func sendWeatherPost(msg WeatherMessage) error {
	jsonData, err := json.Marshal(msg)
	if err != nil {
		return err
	}

	resp, err := http.Post(apiURL, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("failed to post weather log, status code: %d", resp.StatusCode)
	}

	return nil
}

func main() {
	fmt.Println(apiURL)
	fmt.Println(apiURL)
	fmt.Println(apiURL)
	fmt.Println(apiURL)
	fmt.Println(apiURL)
	fmt.Println(apiURL)
	fmt.Println(apiURL)
	fmt.Println(apiURL)
	fmt.Println(apiURL)
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
