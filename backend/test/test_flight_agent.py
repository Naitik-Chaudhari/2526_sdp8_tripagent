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

    print("\n✈️ FLIGHT AGENT RESULT:\n", result)

if __name__ == "__main__":
    main()
