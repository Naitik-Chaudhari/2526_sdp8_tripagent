from crewai import Crew
from backend.context.shared_context import SharedTripContext
from backend.agents.hotel_agent import create_hotel_agent
from backend.tasks.hotel_task import create_hotel_task

def main():
    shared_context = SharedTripContext()

    hotel_agent = create_hotel_agent()
    hotel_task = create_hotel_task(hotel_agent, shared_context)

    crew = Crew(
        agents=[hotel_agent],
        tasks=[hotel_task],
        verbose=True
    )

    result = crew.kickoff()

    print("\n🏨 HOTEL AGENT RESULT:\n", result)

    shared_context.update("hotel_options", result)
    print("\n📦 UPDATED CONTEXT:\n", shared_context.get("hotel_options"))

if __name__ == "__main__":
    main()
