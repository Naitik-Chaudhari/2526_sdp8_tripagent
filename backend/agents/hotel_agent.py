from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.hotel_tool import search_hotels

def create_hotel_agent():
    return Agent(
        role="Hotel Search Specialist",
        goal=(
            "Search hotels for a given destination and dates "
            "and return structured hotel options."
        ),
        backstory=(
            "You are an expert hotel researcher who finds hotels "
            "based on location, dates, and comfort."
        ),
        tools=[search_hotels],
        llm=get_groq_llm(),
        verbose=True
    )
