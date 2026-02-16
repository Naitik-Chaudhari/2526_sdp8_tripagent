from crewai import Task

def create_local_guide_task(guide_agent, shared_context):
    ctx = shared_context.get_all()

    task_input = {
        "destination": ctx["destination_place"],
        "zones": ctx["destination_zones"]
    }

    return Task(
        description=(
            "Find places strictly based on zone categories.\n\n"

            f"INPUT DATA:\n{task_input}\n\n"

            "LOGIC:\n"
            "1. For each zone in zones:\n"
            "2. Extract its categories from ideal_for\n"
            "3. Call search_local_places ONCE per zone using:\n"
            "   - destination\n"
            "   - zone_name (zone.name)\n"
            "   - categories (zone.ideal_for)\n"
            "   - limit (provided externally)\n\n"

            "IMPORTANT:\n"
            "- Do NOT call tool per category separately\n"
            "- Call tool only once per zone\n"
            "- Use ONLY tool output\n"
            "- Do NOT invent places\n"
            "- Return exactly what the tool provides\n\n"

            "Return STRICT JSON in format:\n\n"

            "{\n"
            "  \"recommended_places\": {\n"
            "    \"zone_id\": {\n"
            "      \"categories\": {\n"
            "        \"category_name\": [\n"
            "          {\n"
            "            \"name\": \"\",\n"
            "            \"rating\": 0,\n"
            "            \"type\": \"\",\n"
            "            \"google_maps_link\": \"\"\n"
            "          }\n"
            "        ]\n"
            "      }\n"
            "    }\n"
            "  }\n"
            "}\n\n"

            "Rules:\n"
            "- Do NOT assume a fixed number of results\n"
            "- Do NOT pad or fabricate data\n"
            "- Group results under each zone\n"
            "- No extra keys\n"
            "- No explanations\n"
        ),
        expected_output="Zone-category grouped places",
        agent=guide_agent
    )
