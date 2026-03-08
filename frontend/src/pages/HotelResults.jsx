import { useTrip } from "../context/TripContext";
import { useAuth } from "@clerk/clerk-react";
import { saveHotel } from "../api/hotelSaveApi";
import { useState } from "react";

export default function HotelResults() {

    const { hotelResults, tripId } = useTrip();
    const { getToken } = useAuth();

    const [saving, setSaving] = useState(false);

    // Loading state while results arrive
    if (!hotelResults) {
        return (
            <div className="p-10 text-center">

                <p className="text-xl font-semibold mb-3">
                    Searching best hotels...
                </p>

                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>

                <p className="mt-3 text-gray-500">
                    Please wait while we fetch hotel options
                </p>

            </div>
        );
    }

    const { hotels, recommended_hotel, search_links } =
        hotelResults.hotel_results;

    const handleSaveHotel = async () => {
        try {

            setSaving(true);

            const token = await getToken();

            const res = await saveHotel(tripId, hotelResults, token);
            console.log("Save hotel response:", res);

            alert("Hotel saved successfully!");

            console.log(res);

        } catch (err) {
            console.error("Save hotel error:", err);

            if (err.response && err.response.status === 500) {
                alert("For this trip, hotel results already exist or request failed.");
            } else {
                alert("Something went wrong while saving the hotel.");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Hotel Results
            </h1>

            {/* SAVE BUTTON */}
            <button
                onClick={handleSaveHotel}
                disabled={!tripId || saving}
                className="mb-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
                {saving ? "Saving..." : "Save Hotel Results"}
            </button>

            {/* Warning if trip not saved */}
            {!tripId && (
                <p className="text-sm text-red-500 mb-4">
                    Save your trip first before saving hotels.
                </p>
            )}

            {/* Recommended Hotel */}
            {recommended_hotel && (
                <div className="border-2 border-green-500 bg-green-50 p-5 rounded-lg mb-8">

                    <h2 className="text-xl font-bold text-green-700 mb-3">
                        Recommended Hotel
                    </h2>

                    <p className="font-semibold">
                        {recommended_hotel.name}
                    </p>

                    <p>⭐ Rating: {recommended_hotel.rating}</p>

                    <p>Reviews: {recommended_hotel.reviews}</p>

                    <p>Location Rating: {recommended_hotel.location_rating}</p>

                    <p>Price / night: ₹{recommended_hotel.price_per_night_inr}</p>

                    <p>Total Price: ₹{recommended_hotel.total_price_inr}</p>

                    <p>Check-in Time: {recommended_hotel.check_in_time}</p>

                    {recommended_hotel.booking_link && (
                        <a
                            href={recommended_hotel.booking_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                        >
                            Booking Link
                        </a>
                    )}

                    {/* Nearby Places */}
                    <div className="mt-3">
                        <p className="font-semibold">Nearby Places:</p>

                        {recommended_hotel.nearby_places.map((place, i) => (
                            <div key={i} className="text-sm border-t pt-2 mt-2">

                                <p>{place.name}</p>
                                <p>Distance: {place.distance}</p>

                            </div>
                        ))}
                    </div>

                </div>
            )}

            {/* Other Hotels */}
            <h2 className="text-xl font-bold mb-4">
                Other Hotels
            </h2>

            {hotels.map((hotel, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 mb-5 shadow"
                >

                    <p className="font-semibold">
                        {hotel.name}
                    </p>

                    <p>⭐ Rating: {hotel.rating}</p>

                    <p>Reviews: {hotel.reviews}</p>

                    <p>Location Rating: {hotel.location_rating}</p>

                    <p>Price / night: ₹{hotel.price_per_night_inr}</p>

                    <p>Total Price: ₹{hotel.total_price_inr}</p>

                    <p>Check-in Time: {hotel.check_in_time}</p>

                    {hotel.booking_link && (
                        <a
                            href={hotel.booking_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                        >
                            Booking Link
                        </a>
                    )}

                    {/* Nearby Places */}
                    <div className="mt-3">

                        {hotel.nearby_places.map((place, i) => (
                            <div key={i} className="text-sm border-t pt-2 mt-2">

                                <p>{place.name}</p>

                                <p>
                                    Distance: {place.distance}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>
            ))}

            {/* Google Hotels Link */}
            <div className="mt-8">

                <a
                    href={search_links.google_hotels_url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    View on Google Hotels
                </a>

            </div>

        </div>
    );
}