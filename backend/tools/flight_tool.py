import os
import requests
from dotenv import load_dotenv
from crewai.tools import tool

load_dotenv()

@tool("search_flights")
def search_flights(
    origin: str,
    destination: str,
    outbound_date: str,
    return_date: str,
    adults: int,
    children: int,
    travel_class: int,
    sort_by: int
):
    """
    Fetch flight data using SerpAPI (Google Flights)
    and return a compact, structured list of flight options.
    NOTE: Prices returned are PER ADULT.
    """

    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        return {"error": "SERPAPI_API_KEY missing"}

    params = {
        "engine": "google_flights",
        "departure_id": origin,
        "arrival_id": destination,
        "outbound_date": outbound_date,
        "return_date": return_date,
        "adults": adults,
        "children": children,
        "travel_class": travel_class,
        "sort_by": sort_by,
        "currency": "INR",
        "hl": "en",
        "api_key": api_key
    }

    response = requests.get("https://serpapi.com/search", params=params)
    response.raise_for_status()
    data = response.json()

    flights = []

    for itinerary in data.get("best_flights", []):
        legs = itinerary.get("flights", [])
        layovers = itinerary.get("layovers", [])

        flights.append({
            "airline": legs[0].get("airline") if legs else None,
            "route": f"{origin} → {destination}",
            "price_per_adult": itinerary.get("price"),
            "currency": "INR",
            "total_duration_min": itinerary.get("total_duration"),
            "stops": len(layovers),
            "legs": [
                {
                    "from": leg["departure_airport"]["id"],
                    "to": leg["arrival_airport"]["id"],
                    "departure_time": leg["departure_airport"]["time"],
                    "arrival_time": leg["arrival_airport"]["time"],
                    "flight_number": leg.get("flight_number"),
                    "aircraft": leg.get("airplane")
                }
                for leg in legs
            ],
            "carbon_emissions": itinerary.get("carbon_emissions"),
            "booking_token": itinerary.get("departure_token")
        })

    return {
        "search_summary": {
            "origin": origin,
            "destination": destination,
            "outbound_date": outbound_date,
            "return_date": return_date,
            "adults": adults,
            "children": children,
            "travel_class": travel_class
        },
        "google_flights_url": data.get("search_metadata", {}).get("google_flights_url"),
        "prettify_html_file": data.get("search_metadata", {}).get("prettify_html_file"),
        "flights": flights
    }
