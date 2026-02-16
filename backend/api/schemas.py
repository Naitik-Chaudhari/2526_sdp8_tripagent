from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from datetime import date

class ZoneModel(BaseModel):
    id: str
    name: str
    vibe: str
    ideal_for: List[str]
    recommended_days: int


class TripPlanRequest(BaseModel):
    destination_place: str = Field(..., example="Goa")
    start_date: date = Field(..., example="2026-01-27")
    end_date: date = Field(..., example="2026-01-30")
    trip_duration_days: int
    arrival_day_zone: str
    zones: List[ZoneModel]
    day_zone_strategy: Dict[str, str]


class TripDiscoverRequest(BaseModel):
    destination_place: str = Field(..., example="Goa")
    start_date: date = Field(..., example="2026-01-27")
    end_date: date = Field(..., example="2026-01-30")

    # Optional free-text or tags
    user_summary: Optional[str] = Field(
        None,
        example="Relaxed trip with beaches, nightlife and local food"
    )