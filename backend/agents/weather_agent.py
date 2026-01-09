from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.weather_tool import get_weather

def create_weather_agent():
    return Agent(
        role="Weather Expert",
        goal=(
            "Analyze weather conditions and provide structured, "
            "travel-friendly insights for itinerary planning."
        ),
        backstory=(
            "You are a professional travel meteorologist who converts "
            "raw weather data into actionable travel insights."
        ),
        tools=[get_weather],
        llm=get_groq_llm(),
        verbose=True
    )
