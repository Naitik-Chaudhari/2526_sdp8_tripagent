from crewai import Task

def create_hotel_task(hotel_agent, shared_context):

    ctx = shared_context.get_all()

    hotel_input = {
        "destination": ctx["destination_place"],
        "checkin_date": ctx["check_in_date"],
        "checkout_date": ctx["check_out_date"],
        "adults": ctx["num_adults"],
        "children": ctx["num_children"],
        "sort_by": ctx["hotel_sort_by"]
    }

    return Task(
        description=(
            "You are a hotel search specialist.\n\n"

            "Search hotels using the following input:\n"
            f"{hotel_input}\n\n"

            "Use the hotel search tool and return ONLY a structured JSON "
            "in the following format (no extra text):\n\n"

            "{\n"
            "  \"search_links\": {\n"
            "    \"google_hotels_url\": \"<url>\",\n"
            "    \"prettify_html_file\": \"<url>\"\n"
            "  },\n"
            "  \"hotels\": [\n"
            "    {\n"
            "      \"name\": \"\",\n"
            "      \"rating\": 0,\n"
            "      \"reviews\": 0,\n"
            "      \"location_rating\": 0,\n"
            "      \"price_per_night_inr\": 0,\n"
            "      \"total_price_inr\": 0,\n"
            "      \"check_in_time\": \"\",\n"
            "      \"nearby_places\": [\n"
            "        {\n"
            "          \"name\": \"\",\n"
            "          \"distance\": \"\"\n"
            "        }\n"
            "      ],\n"
            "      \"gps_coordinates\": {\n"
            "        \"latitude\": 0.0,\n"
            "        \"longitude\": 0.0\n"
            "      },\n"
            "      \"booking_link\": \"\",\n"
            "    }\n"
            "  ]\n"
            "}\n\n"

            "Rules:\n"
            "- Use ONLY data from the tool output\n"
            "- If Price fields are null, not include that hotel\n"
            "- Return ONLY top 3 hotels\n"
            "- No markdown, no explanations, no extra text\n"
        ),
        expected_output="Structured JSON hotel search result",
        agent=hotel_agent
    )
