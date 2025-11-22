from .config import API_KEY, LATITUDE, LONGITUDE, validate_env

def build_weather_url() -> str:
    validate_env()
    return (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?lat={LATITUDE}&lon={LONGITUDE}"
        f"&appid={API_KEY}&lang=pt-br&units=metric"
    )
