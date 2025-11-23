from src.collector import run_collector
from src.format_weather_payload import format_weather_payload

if __name__ == "__main__":
    raw_data = run_collector()
    formatted_data = format_weather_payload(raw_data)
    
    print(formatted_data.model_dump_json())  
