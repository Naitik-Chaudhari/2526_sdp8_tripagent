from crewai import Agent
from backend.llm.groq_llm import get_groq_llm

def create_itinerary_agent():
    return Agent(
        role="Trip Itinerary Planner AI",

        goal=(
            "Select the best flight and hotel and create a realistic, time-aware, "
            "weather-optimized day-by-day travel itinerary using ONLY provided agent data."
        ),

        backstory=(
            "You are an elite travel consultant who plans trips exactly how humans do. "
            "You consider arrival times, energy levels, weather suitability, and location flow. "
            "You never invent places and never schedule unrealistic activities."
        ),

        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False
    )
