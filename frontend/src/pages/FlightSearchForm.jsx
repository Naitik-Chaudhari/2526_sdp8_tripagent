import { useState, useEffect } from "react";
import { useTrip } from "../context/TripContext";
import { searchFlights } from "../api/flightApi";
import { useNavigate } from "react-router-dom";

export default function FlightSearchForm() {

    const navigate = useNavigate();
    const { flightSearchData, setFlightSearchData, setFlightResults } = useTrip();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        source_place: "",
        source_airport: "",
        destination_place: "",
        destination_airport: "",
        start_date: "",
        return_date: "",
        num_adults: 1,
        num_children: 0,
        travel_class: 1,
        flight_sort_by: 1
    });

    // ---------------- AUTO FILL FORM ----------------
    useEffect(() => {
        if (flightSearchData) {
            setFormData(flightSearchData);
        }
    }, [flightSearchData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true); // start waiting state

            const requestBody = {
                ...formData,
                num_adults: Number(formData.num_adults),
                num_children: Number(formData.num_children),
                travel_class: Number(formData.travel_class),
                flight_sort_by: Number(formData.flight_sort_by)
            };

            setFlightSearchData(requestBody);

            const res = await searchFlights(requestBody);

            setFlightResults(res);

            navigate("/flight-results");

        } catch (err) {
            console.error("Flight search error:", err);
        } finally {
            setLoading(false); // stop waiting state
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h2 className="text-2xl font-bold mb-6">
                Search Flights
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                {/* Source */}
                <input
                    name="source_place"
                    placeholder="Source City"
                    value={formData.source_place}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                <input
                    name="source_airport"
                    placeholder="Source Airport (IATA)"
                    value={formData.source_airport}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                {/* Destination */}
                <input
                    name="destination_place"
                    placeholder="Destination City"
                    value={formData.destination_place}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                <input
                    name="destination_airport"
                    placeholder="Destination Airport (IATA)"
                    value={formData.destination_airport}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                {/* Dates */}
                <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    name="return_date"
                    value={formData.return_date}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded"
                />

                {/* Passengers */}
                <input
                    type="number"
                    name="num_adults"
                    min="1"
                    value={formData.num_adults}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="num_children"
                    min="0"
                    value={formData.num_children}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                {/* Travel Class */}
                <select
                    name="travel_class"
                    value={formData.travel_class}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value={1}>Economy</option>
                    <option value={2}>Premium Economy</option>
                    <option value={3}>Business</option>
                    <option value={4}>First</option>
                </select>

                {/* Sort By */}
                <select
                    name="flight_sort_by"
                    value={formData.flight_sort_by}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value={1}>Top</option>
                    <option value={2}>Price</option>
                    <option value={3}>Departure</option>
                    <option value={4}>Arrival</option>
                    <option value={5}>Duration</option>
                    <option value={6}>Emissions</option>
                </select>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Searching Flights..." : "Search Flights"}
                </button>

            </form>
        </div>
    );
}