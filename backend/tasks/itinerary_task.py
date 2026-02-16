from crewai import Task

def create_day_planner_task(agent, shared_context):
    ctx = shared_context.get_all()

    # Extract all day keys except day_1
    all_days = list(ctx["zone_day_mapping"].keys())
    planning_days = [d for d in all_days if d != "day_1"]

    return Task(
        description=(

            "You are responsible ONLY for day-wise itinerary planning.\n\n"

            f"DESTINATION: {ctx['destination_place']}\n\n"

            f"TOTAL DAYS: {ctx['trip_duration_days']}\n\n"

            f"DAY-ZONE MAPPING:\n{ctx['zone_day_mapping']}\n\n"

            f"YOU MUST GENERATE ITINERARY ONLY FOR THESE DAYS:\n"
            f"{planning_days}\n\n"

            f"ZONE STRUCTURE:\n{ctx['destination_zones']}\n\n"
            f"WEATHER DATA:\n{ctx['weather_results']}\n\n"
            f"AVAILABLE PLACES:\n{ctx['places_results']}\n\n"
            f"USER SUMMARY:\n{ctx['user_summary']}\n\n"

            "====================================================\n"
            "PLANNING RULES\n"
            "====================================================\n\n"

            "- Do NOT generate itinerary for day_1 (arrival day).\n"
            "- Start planning from day_2.\n"
            "- Use ONLY places from AVAILABLE PLACES.\n"
            "- Never invent places.\n"
            "- Follow zone_day_mapping strictly.\n"
            "- Respect weather compatibility.\n"
            "- High-energy → Morning or Early Afternoon.\n"
            "- Medium energy → Afternoon or Evening.\n"
            "- Relaxation → Evening.\n"
            "- Nightlife → Night only.\n"
            "- Maximum 2 high-energy activities per day.\n"
            "- Maximum 4 total activities per day.\n"
            "- Do not repeat places.\n"
            "- Keep zone flow logical.\n"
            "- Last day should be lighter.\n"
            "- Prioritize USER SUMMARY preferences.\n\n"

            "====================================================\n"
            "CRITICAL ENFORCEMENT\n"
            "====================================================\n\n"

            "- Generate exactly one object for EACH day listed above.\n"
            "- Do NOT skip any listed day.\n"
            "- Do NOT add day_1.\n"
            "- Do NOT generate extra days.\n\n"

            "====================================================\n"
            "RETURN STRICT JSON ONLY\n"
            "====================================================\n\n"

            "{\n"
            "  \"daily_itinerary\": [\n"
            "    {\n"
            "      \"day_number\": <number from listed days>,\n"
            "      \"zone\": \"\",\n"
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
            "- No markdown\n"
            "- No extra keys\n"
        ),

        expected_output="Zone-based structured daily itinerary JSON",
        agent=agent
    )
