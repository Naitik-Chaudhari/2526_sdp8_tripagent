import os
from dotenv import load_dotenv
from crewai import LLM

load_dotenv()

def get_groq_llm():
    if not os.getenv("GROQ_API_KEY"):
        raise ValueError("GROQ_API_KEY not found in .env")

    llm = LLM(
        model="groq/llama-3.3-70b-versatile",
        temperature=0.3,
        max_tokens=1024
    )


    return llm
