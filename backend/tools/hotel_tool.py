import os
import requests
from dotenv import load_dotenv
from crewai.tools import tool

load_dotenv()

@tool("search_hotels")
def search_hotels(
    destination: str,
    checkin_date: str,
    checkout_date: str,
    adults: int,
    children: int,
    sort_by: int
):
    """
    Fetch hotel data using SerpAPI (Google Hotels)
    and return a clean, structured list of hotel options.
    """

    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        return {"error": "SERPAPI_API_KEY missing"}

    params = {
        "engine": "google_hotels",
        "q": destination,
        "check_in_date": checkin_date,
        "check_out_date": checkout_date,
        "adults": adults,
        "children": children,
        "sort_by": sort_by,
        "currency": "INR",
        "hl": "en",
        "gl": "in",
        "api_key": api_key
    }

    response = requests.get("https://serpapi.com/search", params=params)
    response.raise_for_status()
    data = response.json()

    hotels = []

    for prop in data.get("properties", [])[:10]:  # top 10 only
        hotels.append({
            "name": prop.get("name"),
            "rating": prop.get("overall_rating"),
            "reviews": prop.get("reviews"),
            "location_rating": prop.get("location_rating"),

            "price_per_night": prop.get("rate_per_night", {}).get("extracted_lowest"),
            "total_price": prop.get("total_rate", {}).get("extracted_lowest"),

            "check_in_time": prop.get("check_in_time"),

            "nearby_places": [
                {
                    "name": place.get("name"),
                    "distance": place.get("transportations", [{}])[0].get("duration")
                }
                for place in prop.get("nearby_places", [])
            ],

            "gps_coordinates": prop.get("gps_coordinates"),

            "booking_link": prop.get("link"),
            "property_token": prop.get("property_token")
        })

    return {
        "search_metadata": {
            "google_hotels_url": data.get("search_metadata", {}).get("google_hotels_url"),
            "prettify_html_file": data.get("search_metadata", {}).get("prettify_html_file")
        },
        "hotels": hotels
    }
