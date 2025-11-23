package main

import (
	"encoding/json"
	"fmt"
	"time"

	configs "worker/src"

	amqp "github.com/rabbitmq/amqp091-go"
)

var (
	rabbitURL = configs.GetEnv("RABBITMQ_URL")
	queueName = configs.GetEnv("QUEUE_NAME")
	apiURL    = configs.GetEnv("API_URL") + "/api/weather/logs"
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

func main() {
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
			d.Nack(false, false)
			continue
		}

		if msg.Timestamp == "" || msg.Location == "" {
			d.Nack(false, false)
			continue
		}

		// TODO: send POST to API
		fmt.Printf("Received message: %+v\n", msg)

		d.Ack(false)
	}
}
