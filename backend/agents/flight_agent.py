from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.flight_tool import search_flights

def create_flight_agent():
    return Agent(
        role="Flight Search Specialist",

        goal=(
            "Retrieve flight options using real-time data and "
            "return structured flight information strictly based "
            "on tool output."
        ),

        backstory=(
            "You are a backend flight data specialist. "
            "Your responsibility is to fetch flight data using APIs "
            "and normalize it into a clean, structured JSON format. "
            "You do not recommend, rank, or summarize flights."
        ),

        tools=[search_flights],
        llm=get_groq_llm(),
        verbose=True,

        allow_delegation=False
    )
