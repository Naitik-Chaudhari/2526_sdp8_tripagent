from crewai import Crew
from backend.context.shared_context import SharedTripContext
from backend.agents.itinerary_agent import create_itinerary_agent
from backend.tasks.itinerary_task import create_itinerary_task

def main():
    ctx = SharedTripContext()

    itinerary_agent = create_itinerary_agent()
    itinerary_task = create_itinerary_task(itinerary_agent, ctx)

    crew = Crew(
        agents=[itinerary_agent],
        tasks=[itinerary_task],
        verbose=True
    )

    result = crew.kickoff()

    print("\n🧠 FINAL ITINERARY RESULT:\n", result)

if __name__ == "__main__":
    main()
