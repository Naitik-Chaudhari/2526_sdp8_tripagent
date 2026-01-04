import os
import requests
from dotenv import load_dotenv
from crewai.tools import tool

load_dotenv()

@tool("get_weather")
def get_weather(city: str):
    """
    Fetch current and forecast weather data using WeatherAPI.
    """
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        return {"error": "WEATHER_API_KEY missing"}

    url = "http://api.weatherapi.com/v1/forecast.json"
    params = {
        "key": api_key,
        "q": city,
        "days": 3,
        "aqi": "no",
        "alerts": "no"
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    return {
        "location": data["location"]["name"],
        "country": data["location"]["country"],
        "temperature_c": data["current"]["temp_c"],
        "condition": data["current"]["condition"]["text"],
        "humidity": data["current"]["humidity"],
        "forecast": [
            {
                "date": day["date"],
                "avg_temp_c": day["day"]["avgtemp_c"],
                "condition": day["day"]["condition"]["text"]
            }
            for day in data["forecast"]["forecastday"]
        ]
    }
