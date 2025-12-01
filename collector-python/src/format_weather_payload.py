from datetime import datetime, timezone, timedelta
from pydantic import BaseModel

BR_TZ = timezone(timedelta(hours=-3))

class WeatherRecord(BaseModel):
    timestamp: str
    location: str
    condition: str
    temperature: float
    feels_like: float
    humidity: float

def format_weather_payload(data: dict) -> WeatherRecord:
    local_dt = datetime.fromtimestamp(data["dt"], tz=BR_TZ)

    return WeatherRecord(
        timestamp=local_dt.isoformat(),
        location=data["name"],
        condition=data["weather"][0]["description"],
        temperature=data["main"]["temp"],
        feels_like=data["main"]["feels_like"],
        humidity=data["main"]["humidity"]
    )
