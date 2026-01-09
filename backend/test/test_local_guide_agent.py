from crewai import Crew
from backend.context.shared_context import SharedTripContext
from backend.agents.local_guide_agent import create_local_guide_agent
from backend.tasks.task_local_guide import create_local_guide_task

def main():
    ctx = SharedTripContext()
    guide_agent = create_local_guide_agent()
    task = create_local_guide_task(guide_agent, ctx)

    crew = Crew(
        agents=[guide_agent],
        tasks=[task],
        verbose=True
    )

    result = crew.kickoff()
    print("\nLOCAL GUIDE RESULT:\n", result)

if __name__ == "__main__":
    main()
