import time

from backend.context.shared_context import SharedTripContext

from backend.test.test_full_pipeline import (
    run_weather_agent,
    run_local_guide_agent,
    run_itinerary_agent,
    run_destination_structure_agent,
    run_flight_agent,
)


def run_plan_trip(input_data: dict):
    context_data = {
        "destination_place": input_data.destination_place,
        "outbound_date": input_data.start_date.isoformat(),
        "return_date": input_data.end_date.isoformat(),
        "trip_duration_days": input_data.trip_duration_days,
        "arrival_day_zone": input_data.arrival_day_zone,
        "destination_zones": input_data.zones,
        "zone_day_mapping": input_data.day_zone_strategy,
    }

    ctx = SharedTripContext(initial_data=context_data)

    run_weather_agent(ctx)
    run_local_guide_agent(ctx)
    time.sleep(60)  # Simulate some processing time
    run_itinerary_agent(ctx)

    return {
        "destination_place": ctx.get("destination_place"),
        "start_date": ctx.get("outbound_date"),
        "end_date": ctx.get("return_date"),
        "trip_duration_days": ctx.get("trip_duration_days"),
        "arrival_day_zone": ctx.get("arrival_day_zone"),
        "zones": ctx.get("destination_zones"),
        "day_zone_strategy": ctx.get("zone_day_mapping"),
        "itinerary": ctx.get("itinerary_result"),
        "references": {
            "weather": ctx.get("weather_results"),
            "places": ctx.get("places_results")
        }
    }


def run_discover_trip(input_data: dict):
    context_data = {
        "destination_place": input_data.destination_place,
        "outbound_date": input_data.start_date.isoformat(),
        "return_date": input_data.end_date.isoformat(),
        "check_in_date": input_data.start_date.isoformat(),
        "check_out_date": input_data.end_date.isoformat(),
        "user_summary": input_data.user_summary,
    }

    ctx = SharedTripContext(initial_data=context_data)
    run_destination_structure_agent(ctx)

    return {
        "destination_place": ctx.get("destination_place"),
        "start_date": ctx.get("outbound_date"),
        "end_date": ctx.get("return_date"),
        "trip_duration_days": ctx.get("trip_duration_days"),
        "arrival_day_zone": ctx.get("arrival_day_zone"),
        "zones": ctx.get("destination_zones"),
        "day_zone_strategy": ctx.get("zone_day_mapping"),
    }


def run_flight_search(input_data: dict):
    context_data = {
        "source_place": input_data.source_place,
        "source_airport": input_data.source_airport,
        "destination_place": input_data.destination_place,
        "destination_airport": input_data.destination_airport,
        "outbound_date": input_data.start_date.isoformat(),
        "return_date": input_data.return_date.isoformat(),
        "num_adults": input_data.num_adults,
        "num_children": input_data.num_children,
        "travel_class": input_data.travel_class,
        "flight_sort_by": input_data.flight_sort_by,
    }

    ctx = SharedTripContext(initial_data=context_data)
    run_flight_agent(ctx)

    return {
        "source_place": ctx.get("source_place"),
        "source_airport": ctx.get("source_airport"),
        "destination_place": ctx.get("destination_place"),
        "destination_airport": ctx.get("destination_airport"),
        "start_date": ctx.get("outbound_date"),
        "return_date": ctx.get("return_date"),
        "num_adults": ctx.get("num_adults"),
        "num_children": ctx.get("num_children"),
        "travel_class": ctx.get("travel_class"),
        "flight_sort_by": ctx.get("flight_sort_by"),
        "flight_results": ctx.get("flight_results")
    }
