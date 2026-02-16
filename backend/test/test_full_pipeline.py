import json
from crewai import Crew
from backend.context.shared_context import SharedTripContext

# ======================
# AGENTS
# ======================
from backend.agents.flight_agent import create_flight_agent
from backend.agents.hotel_agent import create_hotel_agent
from backend.agents.weather_agent import create_weather_agent
from backend.agents.local_guide_agent import create_local_guide_agent
from backend.agents.itinerary_agent import create_day_planner_agent
from backend.agents.destination_structure_agent import destination_structure_agent

# ======================
# TASKS
# ======================
from backend.tasks.flight_task import create_flight_task
from backend.tasks.hotel_task import create_hotel_task
from backend.tasks.weather_task import create_weather_task
from backend.tasks.task_local_guide import create_local_guide_task
from backend.tasks.itinerary_task import create_day_planner_task
from backend.tasks.destination_structure_task import destination_structure_task


# ======================
# HELPER
# ======================
def run_agent(agent, task):
    crew = Crew(
        agents=[agent],
        tasks=[task],
        verbose=True
    )
    return crew.kickoff()


# ======================
# AGENT RUNNERS
# ======================
def run_flight_agent(ctx):
    print("\n✈️ RUNNING FLIGHT AGENT\n")
    agent = create_flight_agent()
    task = create_flight_task(agent, ctx)
    result = run_agent(agent, task)
    structured_result = json.loads(result.raw)
    ctx.update("flight_results", structured_result)


def run_hotel_agent(ctx):
    print("\n🏨 RUNNING HOTEL AGENT\n")
    agent = create_hotel_agent()
    task = create_hotel_task(agent, ctx)
    result = run_agent(agent, task)
    structured_result = json.loads(result.raw)
    ctx.update("hotel_results", structured_result)


def run_weather_agent(ctx):
    print("\n🌤 RUNNING WEATHER AGENT\n")
    agent = create_weather_agent()
    task = create_weather_task(agent, ctx)
    result = run_agent(agent, task)
    structured_result = json.loads(result.raw)
    ctx.update("weather_results", structured_result)


def run_local_guide_agent(ctx):
    print("\n📍 RUNNING LOCAL GUIDE AGENT\n")
    agent = create_local_guide_agent()
    task = create_local_guide_task(agent, ctx)
    result = run_agent(agent, task)
    structured_result = json.loads(result.raw)
    ctx.update("places_results", structured_result)


def run_itinerary_agent(ctx):
    print("\n🧠 RUNNING ITINERARY AGENT\n")
    agent = create_day_planner_agent()
    task = create_day_planner_task(agent, ctx)
    result = run_agent(agent, task)
    structured_result = json.loads(result.raw)
    ctx.update("itinerary_result", structured_result)


def run_destination_structure_agent(ctx):
    print("\n🗺 RUNNING DESTINATION STRUCTURE AGENT\n")
    agent = destination_structure_agent()
    task = destination_structure_task(agent, ctx)
    result = run_agent(agent, task)
    structured_result = json.loads(result.raw)
    ctx.update("trip_duration_days", structured_result["trip_duration_days"])
    ctx.update("planning_days", structured_result["planning_days"])
    ctx.update("arrival_day_zone", structured_result["arrival_day_zone"])
    ctx.update("destination_zones", structured_result["zones"])
    ctx.update("zone_day_mapping", structured_result["day_zone_strategy"])
    


# # ======================
# # MAIN PIPELINE
# # ======================
# def main():
#     print("\n🚀 STARTING FULL TRIP PLANNING PIPELINE\n")

#     ctx = SharedTripContext()

#     # 1️⃣ Run data collection agents
#     run_flight_agent(ctx)
#     run_hotel_agent(ctx)
#     run_weather_agent(ctx)
#     run_local_guide_agent(ctx)

#     # 2️⃣ Run itinerary agent
#     itinerary_result = run_itinerary_agent(ctx)

#     print("\n🧠 FINAL ITINERARY RESULT:\n")
#     print(itinerary_result)

#     # 3️⃣ Print FULL shared context
#     print("\n================ FULL SHARED CONTEXT ================\n")
#     for key, value in ctx.get_all().items():
#         print(f"\n{key}:\n{value}")

#     print("\n✅ FULL PIPELINE COMPLETED SUCCESSFULLY\n")


# if __name__ == "__main__":
#     main()
