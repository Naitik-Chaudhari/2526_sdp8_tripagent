import { useTrip } from "../context/TripContext";
import { useAuth } from "@clerk/clerk-react";
import { saveFlight } from "../api/flightSaveApi";
import { useState } from "react";

export default function FlightResults() {

  const { flightResults, tripId } = useTrip();
  const { getToken } = useAuth();

  const [saving, setSaving] = useState(false);

  // Loading state while results arrive
  if (!flightResults) {
    return (
      <div className="p-10 text-center">

        <p className="text-xl font-semibold mb-3">
          Searching best flights...
        </p>

        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>

        <p className="mt-3 text-gray-500">
          Please wait while we fetch flight options
        </p>

      </div>
    );
  }

  const { best_flights, recommended_flight, search_links } =
    flightResults.flight_results;

  const handleSaveFlight = async () => {
    try {

      setSaving(true);

      const token = await getToken();

      const res = await saveFlight(tripId, flightResults, token);

      alert("Flight saved successfully!");

      console.log(res);

    } catch (err) {
      console.error("Save hotel error:", err);

            if (err.response && err.response.status === 500) {
                alert("For this trip, flight results already exist or request failed.");
            } else {
                alert("Something went wrong while saving the flight.");
            }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Flight Results
      </h1>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSaveFlight}
        disabled={!tripId || saving}
        className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {saving ? "Saving..." : "Save Flight Results"}
      </button>

      {/* Warning if trip not saved */}
      {!tripId && (
        <p className="text-sm text-red-500 mb-4">
          Save your trip first before saving flights.
        </p>
      )}

      {/* Recommended Flight */}
      {recommended_flight && (
        <div className="border-2 border-green-500 bg-green-50 p-5 rounded-lg mb-8">

          <h2 className="text-xl font-bold text-green-700 mb-3">
            Recommended Flight
          </h2>

          <p className="font-semibold">
            {recommended_flight.airline}
          </p>

          <p>{recommended_flight.route}</p>

          <p>Price: ₹{recommended_flight.price_per_adult}</p>

          <p>Duration: {recommended_flight.total_duration_min} min</p>

          <p>Stops: {recommended_flight.stops}</p>

          <p>
            Carbon Emissions: {recommended_flight.carbon_emissions}
          </p>

          <div className="mt-3">
            {recommended_flight.legs.map((leg, i) => (
              <div key={i} className="text-sm border-t pt-2 mt-2">

                <p>{leg.from} → {leg.to}</p>

                <p>
                  {leg.departure_time} → {leg.arrival_time}
                </p>

                <p>Flight: {leg.flight_number}</p>

                <p>Aircraft: {leg.aircraft}</p>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* Best Flights */}
      <h2 className="text-xl font-bold mb-4">
        Other Flights
      </h2>

      {best_flights.map((flight, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-5 shadow"
        >

          <p className="font-semibold">
            {flight.airline}
          </p>

          <p>{flight.route}</p>

          <p>Price: ₹{flight.price_per_adult}</p>

          <p>Duration: {flight.total_duration_min} min</p>

          <p>Stops: {flight.stops}</p>

          <p>Carbon: {flight.carbon_emissions}</p>

          <div className="mt-3">

            {flight.legs.map((leg, i) => (
              <div key={i} className="text-sm border-t pt-2 mt-2">

                <p>{leg.from} → {leg.to}</p>

                <p>
                  {leg.departure_time} → {leg.arrival_time}
                </p>

                <p>Flight: {leg.flight_number}</p>

                <p>Aircraft: {leg.aircraft}</p>

              </div>
            ))}

          </div>

        </div>
      ))}

      {/* Google Flights Link */}
      <div className="mt-8">

        <a
          href={search_links.google_flights_url}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          View on Google Flights
        </a>

      </div>

    </div>
  );
}