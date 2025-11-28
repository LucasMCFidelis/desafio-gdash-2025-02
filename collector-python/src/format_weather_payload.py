from datetime import datetime
from pydantic import BaseModel

class WeatherRecord(BaseModel):
    timestamp: str
    location: str
    condition: str
    temperature: float
    feels_like: float
    humidity: float

def format_weather_payload(data: dict) -> WeatherRecord:
    return WeatherRecord(
        timestamp=datetime.utcfromtimestamp(data["dt"]).isoformat() + "Z",
        location=data["name"],
        condition=data["weather"][0]["description"],
        temperature=data["main"]["temp"],
        feels_like=data["main"]["feels_like"],
        humidity=data["main"]["humidity"]
    )
