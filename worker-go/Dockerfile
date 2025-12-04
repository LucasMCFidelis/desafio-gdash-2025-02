FROM golang:1.25.4-alpine3.22

WORKDIR /app

COPY go.mod ./
RUN go mod tidy

COPY . .

RUN go build -o worker .

EXPOSE 10000

CMD ["./worker", "-f"]
