#!/bin/bash

# Exportar TODAS as variáveis do ambiente para o cron
printenv | sed 's/^\(.*\)$/export \1/g' > /etc/profile.d/envvars.sh
printenv > /etc/environment

# Iniciar cron em background
service cron start

# Mostrar cron rodando
echo "[entrypoint] cron iniciado"

# Rodar healthcheck (processo principal)
exec python3 /app/health_server.py
