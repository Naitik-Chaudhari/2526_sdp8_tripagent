import os
import requests
from dotenv import load_dotenv
from crewai.tools import tool

load_dotenv()

@tool("search_local_places")
def search_local_places(location: str, preferences: list):
    """
    Fetch local attractions per preference using SerpAPI.
    Ensures EACH preference returns relevant places.
    """

    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        return {"error": "SERPAPI_API_KEY missing"}

    final_results = []
    seen = set()

    for pref in preferences:
        params = {
            "engine": "google_local",
            "q": f"{pref} in {location}",
            "hl": "en",
            "gl": "in",
            "api_key": api_key
        }

        response = requests.get("https://serpapi.com/search", params=params)
        response.raise_for_status()
        data = response.json()

        for place in data.get("local_results", [])[:5]:  # limit per preference
            name = place.get("title")
            if not name or name in seen:
                continue

            maps_link = (
                place.get("link")
                or place.get("links", {}).get("google_maps")
            )

            if not maps_link:
                maps_link = (
                    f"https://www.google.com/maps/search/"
                    f"{name.replace(' ', '+')}+{location.replace(' ', '+')}"
                )

            final_results.append({
                "name": name,
                "rating": place.get("rating"),
                "type": place.get("type") or pref,
                "google_maps_link": maps_link
            })

            seen.add(name)

    return {"places": final_results}
