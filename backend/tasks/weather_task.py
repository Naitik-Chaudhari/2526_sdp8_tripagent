from crewai import Task

def create_weather_task(weather_agent, shared_context):
    destination = shared_context.get("destination_place")
    checkin = shared_context.get("check_in_date")
    checkout = shared_context.get("check_out_date")

    return Task(
        description=(
            f"You are analyzing weather conditions for a trip.\n\n"
            f"Destination: {destination}\n"
            f"Travel Dates: {checkin} to {checkout}\n\n"

            "Use the weather tool to fetch weather data and then produce a "
            "structured weather summary STRICTLY in the following format:\n\n"

            "FORMAT (do not add extra text):\n"
            "{\n"
            "  \"location\": \"<city>\",\n"
            "  \"overall_summary\": \"<short weather overview>\",\n"
            "  \"travel_advice\": \"<impact on travel and activities>\",\n"
            "  \"daily_forecast\": [\n"
            "    {\n"
            "      \"date\": \"YYYY-MM-DD\",\n"
            "      \"condition\": \"<weather condition>\",\n"
            "      \"avg_temp_c\": <number>,\n"
            "      \"suitable_for\": [\"beach\", \"sightseeing\", \"outdoor\"]\n"
            "    }\n"
            "  ]\n"
            "}\n\n"

            "Rules:\n"
            "- Keep the output concise and factual\n"
            "- No markdown, no explanation, only valid JSON\n"
            "- Ensure suitability matches weather conditions"
        ),
        expected_output="Structured JSON weather summary for itinerary planning",
        agent=weather_agent
    )
