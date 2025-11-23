from datetime import datetime
from pydantic import BaseModel

class WeatherRecord(BaseModel):
    timestamp: str
    location: str
    condition: str
    temperature: float
    humidity: float

def format_weather_payload(data: dict) -> WeatherRecord:
    return WeatherRecord(
        timestamp=datetime.utcfromtimestamp(data["dt"]).isoformat() + "Z",
        location=data["name"],
        condition=data["weather"][0]["description"],
        temperature=data["main"]["temp"],
        humidity=data["main"]["humidity"]
    )
