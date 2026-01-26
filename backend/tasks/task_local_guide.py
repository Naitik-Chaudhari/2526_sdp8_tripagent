from crewai import Task

def create_local_guide_task(guide_agent, shared_context):
    ctx = shared_context.get_all()

    guide_input = {
        "location": ctx["destination_place"],
        "preferences": ctx["preferences"]
    }

    return Task(
        description=(
            "You are a local guide search specialist.\n\n"

            "Use the search_local_places tool with the following input:\n"
            f"{guide_input}\n\n"

            "Return ONLY valid JSON in the following format:\n\n"

            "{\n"
            "  \"places\": [\n"
            "    {\n"
            "      \"name\": \"\",\n"
            "      \"rating\": 0,\n"
            "      \"type\": \"\",\n"
            "      \"google_maps_link\": \"\"\n"
            "    }\n"
            "  ]\n"
            "}\n\n"

            "Rules:\n"
            "- Use ONLY tool output data\n"
            "- Filter places strictly based on preferences\n"
            "- Return up to 10 places\n"
            "- No extra keys\n"
            "- No explanations\n"
            "- No markdown\n"
            "- NEVER truncate strings"
        ),
        expected_output="Structured JSON local attractions result",
        agent=guide_agent
    )
