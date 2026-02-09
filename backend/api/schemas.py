from pydantic import BaseModel
from typing import List, Optional


class TripRequest(BaseModel):
    source_place: str
    source_airport: str
    destination_place: str
    destination_airport: str

    outbound_date: str
    return_date: str

    travel_class: int
    num_adults: int
    num_children: int

    preferences: List[str]

    check_in_date: str
    check_out_date: str


    hotel_sort_by: Optional[int] = 8
    flight_sort_by: Optional[int] = 1
