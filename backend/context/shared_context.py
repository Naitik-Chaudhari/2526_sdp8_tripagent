from typing import Dict


class SharedTripContext:
    def __init__(self, initial_data: Dict | None = None):
        # ======================
        # DEFAULT CONTEXT VALUES
        # ======================
        self.data: Dict = {

            # BASIC TRIP DETAILS
            "source_place": None,
            "source_airport": None,
            "destination_place": None,
            "destination_airport": None,

            "outbound_date": None,
            "return_date": None,
            "trip_duration_days": None,
            "flight_sort_by": 1,
            "planning_days": None,
            "arrival_day_zone": None,

            # TRAVEL PREFERENCES
            "travel_class": 1,
            "num_adults": 2,
            "num_children": 0,
            "hotel_sort_by": 8,
            "hotel_class": None,

            "budget_total": None,
            "budget_flight": None,
            "budget_hotel": None,

            "preferences": None,

            "check_in_date": None,
            "check_out_date": None,

            # ======================
            # AGENT OUTPUTS
            # ======================
            "flight_results": None,
            "hotel_results": None,
            "weather_results": None,
            "places_results": None,
            "itinerary_result": None,
            "destination_zones": None,
            "zone_day_mapping": None,
            "trip_days_breakdown": None,
            "user_summary": None,

        }

        # ======================
        # APPLY API INPUT SAFELY
        # ======================
        if initial_data:
            for key, value in initial_data.items():
                if key in self.data:
                    self.data[key] = value

    # ---------------------
    # CONTEXT HELPERS
    # ---------------------
    def update(self, key: str, value):
        if key not in self.data:
            raise KeyError(f"Invalid context key: {key}")
        self.data[key] = value

    def get(self, key: str):
        return self.data.get(key)

    def get_all(self) -> Dict:
        return self.data
