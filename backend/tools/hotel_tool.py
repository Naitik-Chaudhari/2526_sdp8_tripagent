import os
import requests
from dotenv import load_dotenv
from crewai.tools import tool

load_dotenv()

@tool("search_hotels")
def search_hotels(
    location: str,
    check_in_date: str,
    check_out_date: str
):
    """
    Search hotels using SerpAPI Google Hotels.
    Returns cleaned JSON only.
    """

    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        return {"error": "SERPAPI_API_KEY missing"}

    params = {
        "engine": "google_hotels",
        "q": location,
        "check_in_date": check_in_date,
        "check_out_date": check_out_date,
        "currency": "INR",
        "hl": "en",
        "api_key": api_key
    }

    try:
        response = requests.get("https://serpapi.com/search", params=params)
        response.raise_for_status()
        data = response.json()

        properties = data.get("properties", [])
        hotels = []

        for hotel in properties:
            hotels.append({
                "name": hotel.get("name"),
                "price_per_night": hotel.get("rate_per_night", {}).get("lowest"),
                "rating": hotel.get("overall_rating"),
                "reviews": hotel.get("reviews"),
                "address": hotel.get("address"),
                "neighborhood": hotel.get("neighborhood"),
                "hotel_class": hotel.get("hotel_class"),
                "thumbnail": hotel.get("images", [{}])[0].get("thumbnail"),
                "amenities": hotel.get("amenities", []),
                "booking_link": hotel.get("link")  # serpapi direct link
            })

        if not hotels:
            return {"error": "No hotels found"}

        return {"results": hotels}

    except Exception as e:
        return {"error": str(e)}