from crewai import Agent
from backend.llm.groq_llm import get_groq_llm

def destination_structure_agent():
    return Agent(
        role="Destination Structuring Expert",
        goal=(
            "Analyze a travel destination and break it into logical geographic zones, "
            "map trip days to zones, and generate a category catalog suitable for day-wise trip planning."
        ),
        backstory=(
            "You are a senior travel planner who understands how destinations are geographically "
            "and experientially structured. You think like a human trip designer, not a tourist guide."
        ),
        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False
    )
