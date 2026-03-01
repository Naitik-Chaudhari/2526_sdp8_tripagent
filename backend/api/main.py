from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.schemas import TripPlanRequest, TripDiscoverRequest, FlightSearchRequest, HotelSearchRequest
from backend.services.trip_pipeline import run_plan_trip, run_discover_trip, run_flight_search, run_hotel_search
from backend.services.add_arrival_day import add_arrival_day

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
def plan_trip(request: TripPlanRequest):
    request.day_zone_strategy = add_arrival_day(request.day_zone_strategy, request.arrival_day_zone)

    return run_plan_trip(request)


@app.post("/trip/discover")
def discover_trip(request: TripDiscoverRequest):

    return run_discover_trip(request)


@app.post("/flight/search")
def search_flight(request: FlightSearchRequest):

    return run_flight_search(request)


@app.post("/hotel/search")
def search_hotel(request: HotelSearchRequest):
    
    return run_hotel_search(request)

