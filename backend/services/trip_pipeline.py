from backend.context.shared_context import SharedTripContext

from backend.test.test_full_pipeline import (
    run_flight_agent,
    run_hotel_agent,
    run_weather_agent,
    run_local_guide_agent,
    run_itinerary_agent,
)


def run_full_trip_pipeline(input_data: dict):
    ctx = SharedTripContext(initial_data=input_data)

    run_flight_agent(ctx)
    run_hotel_agent(ctx)
    run_weather_agent(ctx)
    run_local_guide_agent(ctx)
    run_itinerary_agent(ctx)

    return ctx.get_all()
