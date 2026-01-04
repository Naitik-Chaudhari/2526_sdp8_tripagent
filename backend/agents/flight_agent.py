from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.flight_tool import search_flights

def create_flight_agent():
    return Agent(
        role="Flight Search Specialist",
        goal=(
            "Search and provide relevant flight options "
            "based on trip requirements."
        ),
        backstory=(
            "You are a flight data specialist responsible for retrieving "
            "accurate and relevant flight options for trip planning."
        ),
        tools=[search_flights],
        llm=get_groq_llm(),
        verbose=True
    )
