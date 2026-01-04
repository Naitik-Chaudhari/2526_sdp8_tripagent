from crewai import Task

def create_flight_task(flight_agent, shared_context):

    ctx = shared_context.get_all()

    # Only pass parameters supported by Google Flights
    flight_input = {
        "origin": ctx["source_airport"],
        "destination": ctx["destination_airport"],
        "outbound_date": ctx["outbound_date"],
        "return_date": ctx["return_date"]
    }

    return Task(
        description=(
            "Search for available flights using the following parameters:\n"
            f"{flight_input}\n\n"
            "Retrieve multiple suitable flight itineraries without ranking or recommendation."
        ),
        expected_output=(
            "A structured list of flight itineraries including airline, route, price, "
            "departure and arrival times, total duration, number of stops, layover details, "
            "and emissions information."
        ),
        agent=flight_agent
    )
