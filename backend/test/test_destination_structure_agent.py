import json
from crewai import Crew
from backend.agents.destination_structure_agent import destination_structure_agent
from backend.tasks.destination_structure_task import destination_structure_task

def run_destination_structure_agent(ctx):
    agent = destination_structure_agent()
    task = destination_structure_task(agent, ctx)

    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()

    structured_result = json.loads(result.raw)

    # Optional: store in context if you want
    ctx.update("trip_duration_days", structured_result["trip_duration_days"])
    # Store results safely into context
    ctx.update("destination_zones", structured_result["zones"])
    ctx.update("zone_day_mapping", structured_result["day_zone_strategy"])
    ctx.update("category_catalog", structured_result["category_catalog"])

    return structured_result
