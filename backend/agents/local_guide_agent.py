from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.local_guide_tool import search_local_places

def create_local_guide_agent():
    return Agent(
        role="Local Guide Finder",
        goal=(
            "Search and filter local attractions using SerpAPI. "
            "Return STRICT JSON only with no extra text."
        ),
        backstory=(
            "You are a local discovery expert. You find relevant attractions such as "
            "beaches, nightlife, adventure spots, nature parks, shopping areas, "
            "and more — strictly based on user preferences."
        ),
        tools=[search_local_places],
        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False,
        instructions=(
            "⚠ IMPORTANT: You must ALWAYS return output in VALID JSON format.\n"
            "⚠ Do NOT return explanations, notes, markdown, or commentary.\n"
            "⚠ The ONLY output should be JSON.\n"
            "Use the search_local_places tool whenever possible."
        )
    )
