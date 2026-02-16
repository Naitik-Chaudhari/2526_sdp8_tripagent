from crewai import Task

def destination_structure_task(agent, ctx):
    destination = ctx.get("destination_place")
    start_date = ctx.get("outbound_date")
    end_date = ctx.get("return_date")
    user_summary = ctx.get("user_summary")

    return Task(
        agent=agent,
        description=f"""
        You are structuring a destination for trip planning.

        INPUT DATA:
        - Destination: {destination}
        - Trip Start Date: {start_date}
        - Trip End Date: {end_date}
        - User Summary: {user_summary}

        YOUR RESPONSIBILITIES:
        1. Calculate total trip duration in days (inclusive).
        2. Identify REAL and well-known geographic zones.
        3. Allocate recommended_days per zone based on user_summary.
        4. Treat Day 1 as ARRIVAL DAY (light exploration only).
        5. Generate a day-wise zone mapping for PLANNING DAYS ONLY.
        6. Ensure zone flow is contiguous and geographically efficient.

        IMPORTANT RULES:
        - Day 1 is arrival day and should NOT be counted as a full planning day.
        - planning_days = trip_duration_days - 1
        - Do NOT assign heavy exploration on arrival day.
        - Once you leave a zone, do NOT return to it later.
        - Zone movement must be geographically logical.
        - Do NOT include specific places.
        - Do NOT include hotels or flights.
        - Do NOT generate itinerary details.
        - Zones must be real and well-known.

        RETURN STRICT JSON ONLY IN THE FOLLOWING FORMAT:

        {{
        "trip_duration_days": <number>,
        "planning_days": <number>,
        "arrival_day_zone": "zone_id",
        "zones": [
            {{
            "id": "zone_id",
            "name": "Zone Name",
            "vibe": "short description",
            "ideal_for": ["category1", "category2"],
            "recommended_days": <number>
            }}
        ],
        "day_zone_strategy": {{
            "day_2": "zone_id",
            "day_3": "zone_id"
        }}
        }}

        HARD RULES:
        - JSON only
        - No markdown
        - No explanations
        - No extra keys
        """,
                expected_output="Structured destination planning JSON"
    )
