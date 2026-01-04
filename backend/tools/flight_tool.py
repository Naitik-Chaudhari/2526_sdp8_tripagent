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
    return_date: str
):
    """
    Fetch flight data using SerpAPI (Google Flights)
    and return a compact, structured list of flight options.
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
        "sort_by": 1,        # Top flights (balanced)
        "currency": "INR",
        "hl": "en",
        "api_key": api_key
    }

    response = requests.get("https://serpapi.com/search", params=params)
    response.raise_for_status()
    data = response.json()

    flights = []


    for itinerary in data.get("best_flights", [])[:5]:
        legs = itinerary.get("flights", [])
        if not legs:
            continue

        flight_numbers = []
        airplanes = []
        route_airports = []
        legroom = None

        for leg in legs:
            flight_numbers.append(leg.get("flight_number"))
            airplanes.append(leg.get("airplane"))
            route_airports.append(leg.get("departure_airport", {}).get("id"))
            legroom = leg.get("legroom", legroom)

        # Add final arrival airport
        route_airports.append(
            legs[-1].get("arrival_airport", {}).get("id")
        )

        layovers = itinerary.get("layovers", [])

        flights.append({
            # BASIC INFO
            "airline": legs[0].get("airline"),
            "airline_logo": itinerary.get("airline_logo"),
            "flight_numbers": flight_numbers,
            "route": " → ".join(route_airports),

            # TIME & DURATION
            "departure_time": legs[0].get("departure_airport", {}).get("time"),
            "arrival_time": legs[-1].get("arrival_airport", {}).get("time"),
            "total_duration_min": itinerary.get("total_duration"),

            # PRICE
            "price": itinerary.get("price"),
            "currency": "INR",

            # LAYOVERS
            "stops": len(layovers),
            "layover_airports": [l.get("id") for l in layovers],
            "layover_duration_min": sum(l.get("duration", 0) for l in layovers),
            "overnight_layover": any(l.get("overnight") for l in layovers),

            # AIRCRAFT & COMFORT
            "airplanes": airplanes,
            "travel_class": legs[0].get("travel_class"),
            "legroom": legroom,

            # EMISSIONS
            "carbon_emissions_kg": (
                itinerary.get("carbon_emissions", {}).get("this_flight", 0) // 1000
            ),
            "carbon_difference_percent": itinerary.get(
                "carbon_emissions", {}
            ).get("difference_percent")
        })

    return flights if flights else {"error": "No flights found"}
