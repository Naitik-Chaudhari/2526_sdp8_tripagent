import os
import requests
from dotenv import load_dotenv
from crewai.tools import tool

load_dotenv()

@tool("search_local_places")
def search_local_places(destination: str, zone_name: str, categories: list, limit: int):
    """
    Fetch local attractions per zone for multiple categories.
    Retrieves up to 'limit' places per category.
    """

    limit = min(limit, 2)

    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        return {"error": "SERPAPI_API_KEY missing"}

    zone_results = {}

    for category in categories:
        params = {
            "engine": "google_local",
            "q": f"{category} in {zone_name}, {destination}",
            "hl": "en",
            "gl": "in",
            "api_key": api_key
        }

        try:
            response = requests.get("https://serpapi.com/search", params=params)
            response.raise_for_status()
            data = response.json()
        except Exception as e:
            zone_results[category] = {"error": str(e)}
            continue

        results = []
        seen = set()

        for place in data.get("local_results", [])[:limit]:
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
                    f"{name.replace(' ', '+')}+{zone_name.replace(' ', '+')}"
                )

            results.append({
                "name": name,
                "rating": place.get("rating"),
                "type": category,
                "google_maps_link": maps_link
            })

            seen.add(name)

        zone_results[category] = results

    return {
        "zone": zone_name,
        "categories": zone_results
    }
