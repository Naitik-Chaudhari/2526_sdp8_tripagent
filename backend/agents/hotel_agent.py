from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.hotel_tool import search_hotels

def create_hotel_agent():
    return Agent(
        role="Hotel Search Specialist",
        goal=(
            "Retrieve hotel options using real-time data and "
            "return structured hotel information strictly based "
            "on tool output."
        ),

        backstory=(
            "You are a backend hotel data specialist. "
            "Your responsibility is to fetch hotel data using APIs "
            "and normalize it into a clean, structured JSON format. "
            "You do not recommend, rank, or summarize hotels."
        ),

        tools=[search_hotels],
        llm=get_groq_llm(),
        verbose=True
    )
