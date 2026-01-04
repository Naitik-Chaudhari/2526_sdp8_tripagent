from typing import Dict, List, Optional


class SharedTripContext:
    def __init__(self):
        self.data: Dict = {

            # BASIC TRIP DETAILS
            "source_place": "Ahmedabad",
            "source_airport": "AMD",
            "destination_place": "Shimla",
            "destination_airport": "SLV",

            "outbound_date": "2026-01-05",  # YYYY-MM-DD
            "return_date": "2026-01-08",           # YYYY-MM-DD
            "trip_duration_days": None,

            # TRAVEL PREFERENCES
            "travel_class": "Economy",     # Economy / Business
            "num_adults": 1,
            "num_children": 0,

            "budget_total": None,          # INR
            "budget_flight": None,
            "budget_hotel": None,

            "preferences": [
                # "beach",
                # "luxury",
                # "nightlife",
                # "budget"
            ],

            # AGENT OUTPUTS
            "weather_info": None,

            "flight_options": [],          # Raw flights from SerpAPI
            "recommended_flights": [],     # Top 3 by Flight Agent

            "hotel_options": [],           # Raw hotels from SerpAPI
            "recommended_hotels": [],      # Top hotels by Hotel Agent

            "local_attractions": [],       # From Local Guide Agent

            # FINAL OUTPUT
            # =====================
            "final_itinerary": None,
            "estimated_total_cost": None
        }

    # ---------------------
    # Context helpers
    # ---------------------
    def update(self, key: str, value):
        if key not in self.data:
            raise KeyError(f"Invalid context key: {key}")
        self.data[key] = value

    def append(self, key: str, value):
        if not isinstance(self.data.get(key), list):
            raise TypeError(f"{key} is not a list")
        self.data[key].append(value)

    def get(self, key: str):
        return self.data.get(key)

    def get_all(self) -> Dict:
        return self.data
