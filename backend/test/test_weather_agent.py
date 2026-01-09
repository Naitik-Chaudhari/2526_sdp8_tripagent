from crewai import Crew

from backend.agents.weather_agent import create_weather_agent
from backend.tasks.weather_task import create_weather_task
from backend.context.shared_context import SharedTripContext


def main():
    # 1️⃣ Shared context (hardcoded for testing)
    shared_context = SharedTripContext()

    # 2️⃣ Create agent
    weather_agent = create_weather_agent()

    # 3️⃣ Create task FROM backend.tasks
    weather_task = create_weather_task(
        weather_agent=weather_agent,
        shared_context=shared_context
    )

    # 4️⃣ Create crew
    crew = Crew(
        agents=[weather_agent],
        tasks=[weather_task],
        verbose=True
    )

    # 5️⃣ Run crew
    result = crew.kickoff()
    print("\n✅ WEATHER AGENT OUTPUT:\n", result)


if __name__ == "__main__":
    main()
