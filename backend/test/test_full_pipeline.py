from crewai import Crew

from backend.context.shared_context import SharedTripContext

# Agents
from backend.agents.flight_agent import create_flight_agent
from backend.agents.hotel_agent import create_hotel_agent
from backend.agents.weather_agent import create_weather_agent
from backend.agents.local_guide_agent import create_local_guide_agent

# Tasks
from backend.tasks.flight_task import create_flight_task
from backend.tasks.hotel_task import create_hotel_task
from backend.tasks.weather_task import create_weather_task
from backend.tasks.task_local_guide import create_local_guide_task


def run_flight_agent(ctx):
    agent = create_flight_agent()
    task = create_flight_task(agent, ctx)

    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()
    ctx.update("flight_results", result)

    print("\n✈️ FLIGHT RESULT STORED\n")


def run_hotel_agent(ctx):
    agent = create_hotel_agent()
    task = create_hotel_task(agent, ctx)

    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()
    ctx.update("hotel_results", result)

    print("\n🏨 HOTEL RESULT STORED\n")


def run_weather_agent(ctx):
    agent = create_weather_agent()
    task = create_weather_task(agent, ctx)

    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()
    ctx.update("weather_results", result)

    print("\n🌤 WEATHER RESULT STORED\n")


def run_local_guide_agent(ctx):
    agent = create_local_guide_agent()
    task = create_local_guide_task(agent, ctx)

    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()
    ctx.update("places_results", result)

    print("\n📍 PLACES RESULT STORED\n")


def main():
    print("\n🚀 STARTING FULL TRIP PIPELINE\n")

    ctx = SharedTripContext()

    run_flight_agent(ctx)
    run_hotel_agent(ctx)
    run_weather_agent(ctx)
    run_local_guide_agent(ctx)

    print("\n================ FINAL SHARED CONTEXT ================\n")
    for k, v in ctx.get_all().items():
        print(f"\n{k}:\n{v}")

    print("\n✅ ALL AGENTS COMPLETED SUCCESSFULLY\n")


if __name__ == "__main__":
    main()
