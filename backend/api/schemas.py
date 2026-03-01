from pydantic import BaseModel, Field, model_validator
from typing import Dict, List, Literal, Optional
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


class FlightSearchRequest(BaseModel):
    source_place: str = Field(..., example="Ahmedabad")
    source_airport: str = Field(..., example="AMD")  # IATA

    destination_place: str = Field(..., example="Goa")
    destination_airport: str = Field(..., example="GOI")  # IATA

    start_date: date = Field(..., example="2026-01-27")
    return_date: date = Field(..., example="2026-01-30")

    num_adults: int = Field(..., ge=1, example=2)
    num_children: int = Field(0, ge=0, example=1)

    travel_class: Literal[1, 2, 3, 4] = Field(
        1,
        description="1=Economy, 2=Premium Economy, 3=Business, 4=First",
        example=1
    )

    flight_sort_by: Literal[1, 2, 3, 4, 5, 6] = Field(
        1,
        description="1=Top, 2=Price, 3=Departure, 4=Arrival, 5=Duration, 6=Emissions",
        example=2
    )

    @model_validator(mode="after")
    def validate_dates(self):
        if self.return_date < self.start_date:
            raise ValueError("return_date must be after start_date")
        return self



class HotelSearchRequest(BaseModel):
    destination_place: str = Field(..., example="Goa")

    checkin_date: date = Field(..., example="2026-01-27")
    checkout_date: date = Field(..., example="2026-01-30")

    num_adults: int = Field(..., ge=1, example=2)
    num_children: int = Field(0, ge=0, example=1)

    hotel_sort_by: Literal[3, 8, 13] = Field(
        3,
        description="3=Lowest Price, 8=Highest Rating, 13=Most Reviewed",
        example=3
    )

    @model_validator(mode="after")
    def validate_dates(self):
        if self.checkout_date <= self.checkin_date:
            raise ValueError("checkout_date must be after checkin_date")
        return self


