from llm.gemini_llm import get_gemini_llm

llm = get_gemini_llm()
response = llm.invoke("Suggest a 2-day travel plan for Goa")

print(response.content)