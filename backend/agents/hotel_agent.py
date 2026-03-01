from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.hotel_tool import search_hotels

def create_hotel_agent():
    return Agent(
        role="Hotel Search & Evaluation Specialist",

        goal=(
            "Retrieve hotel options using real-time data and "
            "return structured hotel information strictly based "
            "on tool output. Additionally, determine the most suitable "
            "hotel using a balanced multi-factor evaluation."
        ),

        backstory=(
            "You are a backend hotel data and evaluation specialist. "
            "Your responsibility is to fetch hotel data using APIs, "
            "normalize it into a clean structured JSON format, and "
            "identify the best overall hotel option using only the "
            "data returned by the tool. "
            "You must not fabricate, assume, or introduce external information."
        ),

        tools=[search_hotels],
        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False
    )

