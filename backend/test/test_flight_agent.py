from crewai import Crew
from backend.context.shared_context import SharedTripContext
from backend.agents.flight_agent import create_flight_agent
from backend.tasks.flight_task import create_flight_task

def main():
    shared_context = SharedTripContext()

    flight_agent = create_flight_agent()
    flight_task = create_flight_task(flight_agent, shared_context)

    crew = Crew(
        agents=[flight_agent],
        tasks=[flight_task],
        verbose=True
    )

    result = crew.kickoff()

    # Update shared context
    shared_context.update("flight_options", result)

    print("\n✈️ FLIGHT AGENT RESULT:\n", result)
    print("\n📦 UPDATED CONTEXT:\n", shared_context.get("flight_options"))

if __name__ == "__main__":
    main()
