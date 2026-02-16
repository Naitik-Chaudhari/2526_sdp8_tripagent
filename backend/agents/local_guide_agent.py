from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.local_guide_tool import search_local_places

def create_local_guide_agent():
    return Agent(
        role="Zone-Based Local Place Collector",
        goal=(
            "Fetch exactly 4 real attractions per category for each zone."
        ),
        backstory=(
            "You are a structured travel data retrieval system. "
            "You strictly collect real places per zone using the provided categories "
            "without adding extra reasoning or logic."
        ),
        tools=[search_local_places],
        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False,
    )
