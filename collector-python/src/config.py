import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WEATHER_API_KEY")
LATITUDE = os.getenv("LATITUDE")
LONGITUDE = os.getenv("LONGITUDE")

def validate_env():
    if not all([API_KEY, LATITUDE, LONGITUDE]):
        raise RuntimeError("Missing environment variables for weather collector.")
