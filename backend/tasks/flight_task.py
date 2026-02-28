from crewai import Task

def create_flight_task(flight_agent, shared_context):

    ctx = shared_context.get_all()

    flight_input = {
        "origin": ctx["source_airport"],
        "destination": ctx["destination_airport"],
        "outbound_date": ctx["outbound_date"],
        "return_date": ctx["return_date"],
        "adults": ctx["num_adults"],
        "children": ctx["num_children"],
        "travel_class": ctx["travel_class"],
        "sort_by": ctx["flight_sort_by"]
    }

    return Task(
        description=(
            "You are a flight search specialist.\n\n"
            "Search flights using the following input:\n"
            f"{flight_input}\n\n"

            "Use the flight search tool and return ONLY structured JSON.\n\n"

            "Return the result in EXACT format below:\n\n"

            "{\n"
            "  \"search_links\": {\n"
            "    \"google_flights_url\": \"<url>\",\n"
            "    \"prettify_html_file\": \"<url>\"\n"
            "  },\n"
            "  \"best_flights\": [ ... top 5 ... ],\n"
            "  \"recommended_flight\": { ... }\n"
            "}\n\n"

            "Selection Logic for recommended_flight:\n"
            "- Evaluate ALL flights using a balanced multi-factor assessment.\n"
            "- Consider price, total duration, number of stops, carbon emissions, "
            "and presence of overnight layovers simultaneously.\n"
            "- Determine which flight provides the best overall trade-off.\n"
            "- Do NOT apply sequential filtering or tie-breaking rules.\n"
            "- recommended_flight MUST be one of the 5 returned flights.\n\n"

            "Rules:\n"
            "- Use ONLY tool output\n"
            "- Return ONLY top 5 best flights\n"
            "- Convert carbon emissions to kg\n"
            "- No markdown\n"
            "- No explanations\n"
            "- Return pure JSON only"
        ),
        expected_output="Structured JSON with multi-factor recommended flight",
        agent=flight_agent
    )

