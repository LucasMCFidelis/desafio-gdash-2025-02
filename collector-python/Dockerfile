FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Instalar cron
RUN apt-get update && apt-get install -y cron

COPY . .

# Criar log para o cron
RUN touch /var/log/cron.log

# Copiar cronjob
COPY cronjob /etc/cron.d/collector-cron

# Normalizar caso tenha CRLF
RUN tr -d '\r' < /etc/cron.d/collector-cron > /tmp/clean && mv /tmp/clean /etc/cron.d/collector-cron

# Permissões corretas
RUN chmod 644 /etc/cron.d/collector-cron
RUN crontab /etc/cron.d/collector-cron

# Copiar entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expor porta para Render
EXPOSE 5000

ENTRYPOINT ["/entrypoint.sh"]
