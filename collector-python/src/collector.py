import requests
from .url_builder import build_weather_url

def run_collector():
    url = build_weather_url()
    response = requests.get(url)
    print(response.json())
