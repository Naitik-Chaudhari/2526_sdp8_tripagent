from crewai import Task

def create_weather_task(weather_agent, shared_context):
    return Task(
        description=(
            f"Get weather for {shared_context.get('destination_place')} "
            f"and summarize travel impact. "
            f"Update weather_info in the shared context."
        ),
        expected_output="Weather summary for travel planning",
        agent=weather_agent
    )
