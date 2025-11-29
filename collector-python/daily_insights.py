import os
import requests
from datetime import datetime
from statistics import mean
from dotenv import load_dotenv

load_dotenv()

API_BASE = os.environ.get("API_BASE", "http://localhost:3000")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

def fetch_weather_logs(date: str):
    url = f"{API_BASE}/weather/logs?date={date}"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()


def generate_ai_insight(summary: dict) -> str:
    if not GROQ_API_KEY:
        raise RuntimeError("A variável GROQ_API_KEY não está definida no ambiente.")

    prompt = f"""
    Gere um insight climático diário baseado nos dados:

    • Média de temperatura: {summary['avg_temperature']} °C
    • Média de sensação térmica: {summary['avg_feels_like']} °C
    • Média de umidade: {summary['avg_humidity']} %
    • Máxima temperatura: {summary['max_temperature']} °C
    • Mínima temperatura: {summary['min_temperature']} °C
    • Cidade: {summary['city']}
    • Data: {summary['date']}

    Crie um texto curto, natural, descritivo e analítico explicando como foi o clima do dia.
    """

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(GROQ_URL, json=payload, headers=headers)
    response.raise_for_status()

    data = response.json()
    return data["choices"][0]["message"]["content"]


def build_daily_summary(logs: list, city: str, date: str):
    temperatures = [l["temperature"] for l in logs]
    feels = [l["feels_like"] for l in logs]
    humidity = [l["humidity"] for l in logs]

    return {
        "city": city,
        "date": date,
        "avg_temperature": round(mean(temperatures), 2),
        "avg_feels_like": round(mean(feels), 2),
        "avg_humidity": round(mean(humidity), 2),
        "max_temperature": max(temperatures),
        "min_temperature": min(temperatures),
    }


def publish_insight(summary: dict, generated_text: str):
    payload = {
        "city": summary["city"],
        "date": summary["date"],
        "summary": summary,
        "insight_text": generated_text,
    }

    print("\n--- PREVIEW DO INSIGHT ---")
    print(payload)
    print("--------------------------\n")

    response = requests.post(f"{API_BASE}/weather/insights", json=payload)
    response.raise_for_status()
    return response.json()


def run_daily_insight_generation():
    today = datetime.utcnow().strftime("%Y-%m-%d")

    logs = fetch_weather_logs(today)
    if not logs:
        print(f"[insights] Nenhum dado encontrado para {today}")
        return

    city = logs[0]["location"]
    summary = build_daily_summary(logs, city, today)

    ai_text = generate_ai_insight(summary)
    publish_insight(summary, ai_text)

    print("[insights] Insight diário gerado com sucesso.")


if __name__ == "__main__":
    run_daily_insight_generation()
