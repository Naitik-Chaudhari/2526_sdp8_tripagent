
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

            "Use the hotel search tool and return ONLY structured JSON.\n\n"

            "Return the result in EXACT format below:\n\n"

            "{\n"
            "  \"search_links\": {\n"
            "    \"google_hotels_url\": \"<url>\",\n"
            "    \"prettify_html_file\": \"<url>\"\n"
            "  },\n"
            "  \"hotels\": [ ... top 5 ... ],\n"
            "  \"recommended_hotel\": { ... }\n"
            "}\n\n"

            "Hotel object format inside hotels array:\n"
            "{\n"
            "  \"name\": \"\",\n"
            "  \"rating\": 0,\n"
            "  \"reviews\": 0,\n"
            "  \"location_rating\": 0,\n"
            "  \"price_per_night_inr\": 0,\n"
            "  \"total_price_inr\": 0,\n"
            "  \"check_in_time\": \"\",\n"
            "  \"nearby_places\": [\n"
            "    {\n"
            "      \"name\": \"\",\n"
            "      \"distance\": \"\"\n"
            "    }\n"
            "  ],\n"
            "  \"gps_coordinates\": {\n"
            "    \"latitude\": 0.0,\n"
            "    \"longitude\": 0.0\n"
            "  },\n"
            "  \"booking_link\": \"\"\n"
            "}\n\n"

            "Selection Logic for recommended_hotel:\n"
            "- Evaluate ALL hotels using a balanced multi-factor assessment.\n"
            "- Consider price per night, total price, rating, number of reviews, "
            "and location rating simultaneously.\n"
            "- Determine which hotel provides the best overall trade-off.\n"
            "- Do NOT apply sequential filtering or tie-breaking rules.\n"
            "- recommended_hotel MUST be one of the 5 returned hotels.\n\n"

            "Rules:\n"
            "- Use ONLY data from the tool output\n"
            "- If price fields are null, exclude that hotel\n"
            "- Return ONLY top 5 hotels\n"
            "- No markdown\n"
            "- No explanations\n"
            "- Return pure JSON only"
        ),
        expected_output="Structured JSON with multi-factor recommended hotel",
        agent=hotel_agent
    )