import { useTrip } from "../context/TripContext";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { saveTrip } from "../api/tripSaveApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TripPlan() {

  const { discoverData, tripPlan, setTripPlan, setTripId, setFlightSearchData, setHotelSearchData } = useTrip();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- PLAN TRIP API ----------------
  useEffect(() => {
    const fetchPlan = async () => {
      try {

        const res = await axios.post(
          "http://127.0.0.1:8000/plan-trip",
          discoverData
        );

        setTripPlan(res.data);

      } catch (err) {
        console.error("Plan trip error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!tripPlan) {
      fetchPlan();
    } else {
      setLoading(false);
    }

  }, []);

  // ---------------- PLACE CLICK ----------------
  const handlePlaceClick = (zone, placeName) => {

    const recommendedPlaces =
      tripPlan.references.places.recommended_places;

    const zoneData = recommendedPlaces[zone];

    if (!zoneData) return;

    const categories = zoneData.categories;

    for (const category in categories) {

      const found = categories[category].find(
        (p) => p.name === placeName
      );

      if (found) {
        setSelectedPlace(found);
        return;
      }
    }
  };

  // ---------------- SAVE TRIP ----------------
  const handleSaveTrip = async () => {
    try {

      const token = await getToken();

      const res = await saveTrip(tripPlan, token);

      const tripId = res.trip.id;

      setTripId(tripId);

      alert(`Trip saved successfully!\nTrip ID: ${tripId}`);

    } catch (error) {
      console.error("Save trip error:", error);
    }
  };

  // ---------------- SEARCH FLIGHTS ----------------
  const handleSearchFlights = () => {

    const flightData = {
      source_place: "",
      source_airport: "",
      destination_place: tripPlan.destination_place,
      destination_airport: "",
      start_date: tripPlan.start_date,
      return_date: tripPlan.end_date,
      num_adults: 1,
      num_children: 0,
      travel_class: 1,
      flight_sort_by: 1
    };

    setFlightSearchData(flightData);

    navigate("/flight-search");
  };

  const handleSearchHotels = () => {

    if (!tripPlan) return;

    const requestBody = {
      destination_place: tripPlan.destination_place,
      checkin_date: tripPlan.start_date,
      checkout_date: tripPlan.end_date,
      num_adults: 2,
      num_children: 0,
      hotel_sort_by: 3
    };

    setHotelSearchData(requestBody);

    navigate("/hotel-search");
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="p-6 text-center">
        Generating itinerary...
      </div>
    );
  }

  if (!tripPlan) {
    return <p className="p-6">No itinerary found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Trip Itinerary – {tripPlan.destination_place}
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">

        <button
          onClick={handleSaveTrip}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Save Trip
        </button>

        <button
          onClick={handleSearchFlights}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Search Flights
        </button>

        <button
          onClick={handleSearchHotels}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Search Hotels
        </button>
      </div>

      {/* DAILY ITINERARY */}
      {tripPlan.itinerary.daily_itinerary.map((day) => (

        <div
          key={day.day_number}
          className="border rounded-lg p-5 mb-6 shadow"
        >

          <h2 className="text-xl font-semibold">
            Day {day.day_number} – {day.zone}
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Weather: {day.weather}
          </p>

          {day.schedule.map((item, i) => (

            <div key={i} className="mb-3">

              <p className="font-semibold">
                {item.time}
              </p>

              <button
                onClick={() =>
                  handlePlaceClick(day.zone, item.place)
                }
                className="text-blue-600 hover:underline"
              >
                {item.place}
              </button>

              <p className="text-gray-600 text-sm">
                {item.description}
              </p>

              <p className="text-gray-500 text-xs">
                Must Enjoy: {item.must_enjoy}
              </p>

            </div>

          ))}

        </div>

      ))}

      {/* PLACE POPUP */}
      {selectedPlace && (

        <div className="fixed bottom-5 right-5 bg-white shadow-xl border p-5 rounded-lg w-80">

          <h3 className="text-lg font-bold">
            {selectedPlace.name}
          </h3>

          <p>Rating ⭐ {selectedPlace.rating}</p>

          <p>Type: {selectedPlace.type}</p>

          <a
            href={selectedPlace.google_maps_link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Open in Google Maps
          </a>

          <button
            onClick={() => setSelectedPlace(null)}
            className="mt-3 text-red-500"
          >
            Close
          </button>

        </div>

      )}

    </div>
  );
}