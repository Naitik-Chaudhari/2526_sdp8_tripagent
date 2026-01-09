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

            "Use the flight search tool and return ONLY a structured JSON "
            "in the following format (no extra text):\n\n"

            "{\n"
            "  \"search_links\": {\n"
            "    \"google_flights_url\": \"<url>\",\n"
            "    \"prettify_html_file\": \"<url>\"\n"
            "  },\n"
            "  \"best_flights\": [\n"
            "    {\n"
            "      \"airline\": \"\",\n"
            "      \"flight_numbers\": [],\n"
            "      \"route\": \"\",\n"
            "      \"departure_time\": \"\",\n"
            "      \"arrival_time\": \"\",\n"
            "      \"total_duration_min\": 0,\n"
            "      \"stops\": 0,\n"
            "      \"layover_airports\": [],\n"
            "      \"price_inr\": 0,\n"
            "      \"travel_class\": \"\",\n"
            "      \"aircrafts\": [],\n"
            "      \"carbon_emissions_kg\": 0,\n"
            "      \"booking_token\": \"\"\n"
            "    }\n"
            "  ]\n"
            "}\n\n"

            "Rules:\n"
            "- Use ONLY data from the tool output\n"
            "- Include only BEST flights\n"
            "- Convert carbon emissions to kg\n"
            "- No markdown, no explanations"
        ),
        expected_output="Structured JSON flight search result",
        agent=flight_agent
    )
