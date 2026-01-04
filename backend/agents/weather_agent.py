from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.weather_tool import get_weather

def create_weather_agent():
    return Agent(
        role="Weather Expert",
        goal=(
            "Analyze weather conditions and provide travel-friendly insights "
            "for trip planning."
        ),
        backstory=(
            "You are a travel meteorologist who helps travelers "
            "decide activities based on weather."
        ),
        tools=[get_weather],
        llm=get_groq_llm(),
        verbose=True
    )
