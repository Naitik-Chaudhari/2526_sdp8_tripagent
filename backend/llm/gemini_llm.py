import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

def get_gemini_llm():
    if not os.getenv("GOOGLE_API_KEY"):
        raise ValueError("GOOGLE_API_KEY not found in .env")

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",  # ✅ GA stable model
        temperature=0.5
    )

    return llm
