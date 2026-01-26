from typing import Dict, List, Optional


class SharedTripContext:
    def __init__(self):
        self.data: Dict = {

            # BASIC TRIP DETAILS
            "source_place": "Ahmedabad",
            "source_airport": "AMD",
            "destination_place": "Goa",
            "destination_airport": "GOI",

            "outbound_date": "2026-01-27",  # YYYY-MM-DD
            "return_date": "2026-01-30",           # YYYY-MM-DD
            "trip_duration_days": None,
            "flight_sort_by": 1,

            # TRAVEL PREFERENCES
            "travel_class": 1,     # Economy / Business
            "num_adults": 2,
            "num_children": 0,
            "hotel_sort_by": 8,
            "hotel_class": None,        # 3-star, 4-star, 5-star

            "budget_total": None,          # INR
            "budget_flight": None,
            "budget_hotel": None,

            "preferences": [
                "beach",
                "nightlife",
                "local cuisine",
                "water sports",
                "cultural experiences"
            ],

            "check_in_date": "2026-01-27",
            "check_out_date": "2026-01-29",

            "flight_results": None,      # From Flight Agent
            "hotel_results": None,       # From Hotel Agent
            "weather_results": None,     # From Weather Agent
            "places_results": None,      # From Local Guide Agent


            # "local_attractions": [],       # From Local Guide Agent

            # # FINAL OUTPUT
            # # =====================
            # "final_itinerary": None,
            # "estimated_total_cost": None
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
