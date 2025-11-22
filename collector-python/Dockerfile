FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y cron

COPY . .

# Criar log
RUN touch /var/log/cron.log

# Copiar o cronjob real (nome correto)
COPY cronjob /etc/cron.d/collector-cron

# Remover CRLF se existir
RUN tr -d '\r' < /etc/cron.d/collector-cron > /tmp/clean && mv /tmp/clean /etc/cron.d/collector-cron

# Permissões obrigatórias
RUN chmod 644 /etc/cron.d/collector-cron
RUN crontab /etc/cron.d/collector-cron

CMD ["cron", "-f"]
