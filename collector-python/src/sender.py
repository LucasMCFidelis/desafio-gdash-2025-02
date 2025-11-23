import json
import pika
import os

RABBITMQ_URL = os.getenv("RABBITMQ_URL")
QUEUE = os.getenv("QUEUE_NAME")

def publish_weather_message(payload: dict):
    if not RABBITMQ_URL or not QUEUE:
        raise RuntimeError("RABBITMQ_URL and QUEUE_NAME is missing from environment variables")

    params = pika.URLParameters(RABBITMQ_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE, durable=True)

    channel.basic_publish(
        exchange="",
        routing_key=QUEUE,
        body=json.dumps(payload),
        properties=pika.BasicProperties(
            delivery_mode=2
        )
    )

    connection.close()
