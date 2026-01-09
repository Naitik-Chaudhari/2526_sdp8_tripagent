from crewai import Task

def create_hotel_task(hotel_agent, shared_context):
    ctx = shared_context.get_all()

    hotel_input = {
        "location": ctx["destination_place"],
        "check_in_date": ctx["outbound_date"],
        "check_out_date": ctx["return_date"]
    }

    return Task(
        description=(
            f"Search hotels using the following parameters:\n"
            f"{hotel_input}\n\n"
            "Return a list of suitable hotel options."
        ),
        expected_output=(
            "A list of hotels with name, price, rating, amenities, and booking link."
        ),
        agent=hotel_agent
    )
