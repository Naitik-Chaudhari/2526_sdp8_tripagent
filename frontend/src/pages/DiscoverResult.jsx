import { useTrip } from "../context/TripContext";
import { useNavigate } from "react-router-dom";

export default function DiscoverResult() {
  const { discoverData } = useTrip();
  const navigate = useNavigate();

  if (!discoverData) {
    return <p className="p-6">No trip data found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Trip Overview */}
      <h1 className="text-3xl font-bold mb-4">
        Trip Plan for {discoverData.destination_place}
      </h1>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <p><b>Start Date:</b> {discoverData.start_date}</p>
        <p><b>End Date:</b> {discoverData.end_date}</p>
        <p><b>Trip Duration:</b> {discoverData.trip_duration_days} days</p>
        <p><b>Arrival Day Zone:</b> {discoverData.arrival_day_zone}</p>
      </div>

      {/* Zones */}
      <h2 className="text-2xl font-semibold mb-4">Zones</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {discoverData.zones.map((zone) => (
          <div
            key={zone.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">{zone.name}</h3>

            <p className="text-gray-600 mt-1">{zone.vibe}</p>

            <div className="mt-3">
              <p className="font-semibold text-sm">Ideal For:</p>

              <ul className="list-disc ml-5 text-sm text-gray-600">
                {zone.ideal_for.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="mt-3 text-sm text-blue-600">
              Recommended Days: {zone.recommended_days}
            </p>
          </div>
        ))}
      </div>

      {/* Day Zone Strategy */}
      <h2 className="text-2xl font-semibold mb-3">
        Day Zone Strategy
      </h2>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
        {Object.entries(discoverData.day_zone_strategy).map(
          ([day, zone]) => (
            <p key={day}>
              <b>{day.replace("_", " ").toUpperCase()}</b> → {zone}
            </p>
          )
        )}
      </div>

      {/* Button */}
      <div className="text-center">
        <button
          onClick={() => navigate("/plan-trip")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Plan Full Trip
        </button>
      </div>

    </div>
  );
}