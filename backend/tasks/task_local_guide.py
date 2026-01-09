from crewai import Task

def create_local_guide_task(guide_agent, shared_context):
    ctx = shared_context.get_all()

    return Task(
        description=(
            "Use the search_local_places tool to fetch real attractions using SerpAPI. "
            "Filter ONLY based on the user's preference tags. "
            "Return STRICT JSON with no explanation.\n\n"
            f"Destination: {ctx['destination_place']}\n"
            f"User Preferences: {ctx['preferences']}\n"
        ),
        expected_output=(
            "A JSON object containing: name, rating, reviews, address, type, "
            "thumbnail, google_maps_link."
        ),
        agent=guide_agent,
        
    )
