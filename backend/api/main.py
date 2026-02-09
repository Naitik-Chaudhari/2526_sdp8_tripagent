from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.schemas import TripRequest
from backend.api.trip_discover import TripDiscoverRequest
from backend.api.trip_discover_response import TripDiscoverResponse
from backend.context.shared_context import SharedTripContext
from backend.test.destination_structure_runner import run_destination_structure_agent
from backend.services.trip_pipeline import run_full_trip_pipeline

app = FastAPI(
    title="AI Trip Planner API",
    description="Multi-agent AI trip planning system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite
        "http://localhost:3000"    # CRA (optional)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "AI Trip Planner API is live 🚀"
    }


@app.post("/plan-trip")
def plan_trip(request: TripRequest):
    ctx = run_full_trip_pipeline(request.dict())
    return {
        "status": "success",
        "itinerary": ctx.get("itinerary_result"),
        "references": {
            "flights": ctx.get("flight_results"),
            "hotels": ctx.get("hotel_results"),
            "weather": ctx.get("weather_results"),
            "places": ctx.get("places_results")
        }
    }
