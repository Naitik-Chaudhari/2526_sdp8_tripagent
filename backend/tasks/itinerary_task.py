from crewai import Task


def create_itinerary_task(itinerary_agent, shared_context):
    ctx = shared_context.get_all()

    return Task(
        description=(
            "You are an expert human travel planner AI.\n\n"

            "You MUST use ONLY the real data provided below.\n\n"

            f"FLIGHTS DATA:\n{ctx['flight_results']}\n\n"
            f"HOTELS DATA:\n{ctx['hotel_results']}\n\n"
            f"WEATHER DATA:\n{ctx['weather_results']}\n\n"
            f"PLACES DATA:\n{ctx['places_results']}\n\n"
            f"USER PREFERENCES:\n{ctx['preferences']}\n\n"

            "====================================================\n"
            "UNIVERSAL INTELLIGENCE RULES (STRICTLY FOLLOW)\n"
            "====================================================\n\n"

            "FLIGHT SELECTION LOGIC:\n"
            "- Prefer direct flights\n"
            "- Prefer shortest duration\n"
            "- Prefer reasonable price (not extreme cheapest or most expensive)\n"
            "- Prefer arrival time that allows useful first day planning\n\n"

            "HOTEL SELECTION LOGIC:\n"
            "- Prefer higher rating\n"
            "- Prefer better location rating\n"
            "- Prefer strong value for money\n\n"

            "----------------------------------------------------\n"
            "DAY TIMING RULES (BASED ON ARRIVAL TIME)\n"
            "----------------------------------------------------\n"
            "- If arrival time >= 16:00 → NO Morning or Afternoon on Day 1\n"
            "- If arrival time between 12:00 and 16:00 → NO Morning on Day 1\n"
            "- If arrival before 12:00 → full day allowed\n\n"

            "----------------------------------------------------\n"
            "ITINERARY LOGIC:\n"
            "----------------------------------------------------\n"
            "- If arrival is after 4 PM → only Evening & Night activities\n"
            "- First day = light exploration\n"
            "- Middle days = major attractions & outdoor adventures\n"
            "- Last day = short & nearby activities only\n"
            "- Physically demanding or far places must go on middle days\n"
            "- Balance indoor and outdoor across the day\n\n"


            "----------------------------------------------------\n"
            "UNIVERSAL ACTIVITY ENERGY MAPPING\n"
            "----------------------------------------------------\n"
            "- High energy/outdoor activities (nature, trekking, sightseeing, beaches, adventure, parks, viewpoints) → Morning or Early Afternoon\n"
            "- Medium energy activities (culture, museums, temples, markets, food areas, historical sites) → Afternoon or Evening\n"
            "- Relaxation/scenic places → Evening\n"
            "- Entertainment/nightlife → Night only\n\n"

            "----------------------------------------------------\n"
            "ENERGY & DISTANCE RULES\n"
            "----------------------------------------------------\n"
            "- Long travel or physically heavy places must be scheduled on full middle days\n"
            "- First day after late arrival should be light activities only\n"
            "- Last day should avoid long excursions\n\n"

            "----------------------------------------------------\n"
            "WEATHER COMPATIBILITY\n"
            "----------------------------------------------------\n"
            "- Schedule outdoor/high-energy activities ONLY when weather is suitable\n"
            "- Use indoor/cultural/food activities when weather is not suitable\n\n"

            "----------------------------------------------------\n"
            "DEPARTURE DAY RULES\n"
            "----------------------------------------------------\n"
            "- Return day can only contain Morning or Afternoon activities\n"
            "- NEVER schedule Evening or Night on departure day\n\n"

            "----------------------------------------------------\n"
            "PLACE USAGE RULES\n"
            "----------------------------------------------------\n"
            "- Use ONLY places from PLACES DATA\n"
            "- Never invent locations\n"
            "- Do NOT repeat the same place\n"
            "- Infer activity style from place name and type\n"
            "- Prefer grouping similar nearby activities in same day\n\n"

            "----------------------------------------------------\n"
            "REALISTIC HUMAN PLANNING CONSTRAINTS\n"
            "----------------------------------------------------\n"
            "- Maximum 2 high-energy activities per day\n"
            "- Maximum 4 total activities per day\n"
            "- Include natural rest/food flow\n"
            "- Avoid jumping environments unnecessarily\n"
            "- Keep variety across days (mix of nature, culture, relaxation, entertainment)\n\n"

            "====================================================\n"
            "RETURN STRICT JSON ONLY (NO TEXT, NO MARKDOWN)\n"
            "====================================================\n\n"

            "{\n"
            "  \"best_flight\": {\n"
            "    \"airline\": \"\",\n"
            "    \"flight_numbers\": []\n"
            "  },\n"
            "  \"best_hotel\": {\n"
            "    \"name\": \"\"\n"
            "  },\n"
            "  \"daily_itinerary\": [\n"
            "    {\n"
            "      \"date\": \"YYYY-MM-DD\",\n"
            "      \"weather\": \"\",\n"
            "      \"schedule\": [\n"
            "        {\n"
            "          \"time\": \"Morning/Afternoon/Evening/Night\",\n"
            "          \"place\": \"\",\n"
            "          \"description\": \"\",\n"
            "          \"must_enjoy\": \"\"\n"
            "        }\n"
            "      ]\n"
            "    }\n"
            "  ]\n"
            "}\n\n"

            "HARD RULES:\n"
            "- JSON only\n"
            "- No explanations\n"
            "- Be realistic like a professional travel consultant"
        ),

        expected_output="Optimized universal realistic itinerary JSON",
        agent=itinerary_agent
    )
