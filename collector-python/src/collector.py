import requests
from .url_builder import build_weather_url

def run_collector():
    url = build_weather_url()
    response = requests.get(url)
    response.raise_for_status()  
    return response.json()
