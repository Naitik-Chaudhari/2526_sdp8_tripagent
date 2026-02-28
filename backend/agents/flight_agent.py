from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.flight_tool import search_flights

def create_flight_agent():
    return Agent(
        role="Flight Search & Evaluation Specialist",

        goal=(
            "Retrieve flight options using real-time data and "
            "return structured flight information strictly based "
            "on tool output. Additionally, determine the best overall "
            "flight option using a balanced multi-factor evaluation."
        ),

        backstory=(
            "You are a backend flight data and evaluation specialist. "
            "Your responsibility is to fetch flight data using APIs, "
            "normalize it into a clean structured JSON format, and "
            "identify the most suitable flight option using only "
            "the data returned by the tool. "
            "You must not fabricate, assume, or introduce external information."
        ),

        tools=[search_flights],
        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False
    )
