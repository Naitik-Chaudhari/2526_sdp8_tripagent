from crewai import Agent
from backend.llm.groq_llm import get_groq_llm

def create_day_planner_agent():
    return Agent(
        role="Day Wise Travel Planner AI",

        goal=(
            "Create a realistic, weather-aware, zone-based daily itinerary "
            "using ONLY the provided structured data."
        ),

        backstory=(
            "You are a professional human-style travel planner. "
            "You follow zone flow strictly, respect energy levels, "
            "consider weather suitability, and never invent locations."
        ),

        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False
    )
