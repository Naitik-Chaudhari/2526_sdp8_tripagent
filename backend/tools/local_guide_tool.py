import os
import requests
from dotenv import load_dotenv
from crewai.tools import tool

load_dotenv()

@tool("search_local_places")
def search_local_places(location: str, preferences: list):
    """
    Fetch attractions using SerpAPI Google Local Results.
    Always return VALID JSON with: name, rating, reviews, address, type,
    thumbnail, google_maps_link (fallback if missing).
    """

    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        return {"error": "SERPAPI_API_KEY missing"}

    # Build query from preferences
    query = ", ".join(preferences) if preferences else "tourist attractions"

    params = {
        "engine": "google_local",
        "q": f"{query} in {location}",
        "hl": "en",
        "api_key": api_key,
    }

    try:
        response = requests.get("https://serpapi.com/search", params=params)
        response.raise_for_status()
        data = response.json()

        places = data.get("local_results", [])
        cleaned = []

        for p in places:

            # ----------- Extract links (priority order) -----------
            maps_link = (
                p.get("link") or
                p.get("gps_coordinates", {}).get("google_maps_url") or
                p.get("links", {}).get("google_maps")
            )

            # ----------- If ALL links missing → Auto generate one -----------
            if not maps_link:
                name = p.get("title", "").replace(" ", "+")
                city = location.replace(" ", "+")
                maps_link = f"https://www.google.com/maps/search/{name}+{city}"

            cleaned.append({
                "name": p.get("title"),
                "rating": p.get("rating"),
                "reviews": p.get("reviews"),
                "address": p.get("address"),
                "type": p.get("type"),
                "thumbnail": p.get("thumbnail"),
                "google_maps_link": maps_link
            })

        return {"results": cleaned}

    except Exception as e:
        return {"error": str(e)}
