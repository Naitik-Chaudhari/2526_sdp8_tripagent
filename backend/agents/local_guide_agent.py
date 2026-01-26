from crewai import Agent
from backend.llm.groq_llm import get_groq_llm
from backend.tools.local_guide_tool import search_local_places

def create_local_guide_agent():
    return Agent(
        role="Local Guide Finder",
        goal=(
            "Find real local attractions strictly based on user preferences "
            "and return structured JSON only."
        ),
        backstory=(
            "You are a travel discovery expert who finds beaches, nightlife spots, "
            "local cuisine places, sightseeing attractions, and activities using live data."
        ),
        tools=[search_local_places],
        llm=get_groq_llm(),
        verbose=True,
        allow_delegation=False,
        instructions=(
            "CRITICAL RULES:\n"
            "- ALWAYS use the search_local_places tool\n"
            "- Output MUST be VALID JSON ONLY\n"
            "- Do NOT add explanations, markdown, or extra keys\n"
            "- Output schema must EXACTLY match the task format"
        )
    )
