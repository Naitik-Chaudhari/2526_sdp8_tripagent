import { useState, useEffect } from "react";
import { useTrip } from "../context/TripContext";
import { searchHotels } from "../api/hotelApi";
import { useNavigate } from "react-router-dom";

export default function HotelSearchForm() {

  const navigate = useNavigate();
  const { hotelSearchData, setHotelSearchData, setHotelResults } = useTrip();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination_place: "",
    checkin_date: "",
    checkout_date: "",
    num_adults: 1,
    num_children: 0,
    hotel_sort_by: 3
  });

  // -------- AUTO FILL FORM --------
  useEffect(() => {
    if (hotelSearchData) {
      setFormData(hotelSearchData);
    }
  }, [hotelSearchData]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const requestBody = {
        ...formData,
        num_adults: Number(formData.num_adults),
        num_children: Number(formData.num_children),
        hotel_sort_by: Number(formData.hotel_sort_by)
      };

      setHotelSearchData(requestBody);

      const res = await searchHotels(requestBody);

      // save full response
      setHotelResults(res);

      navigate("/hotel-results");

    } catch (err) {
      console.error("Hotel search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6">
        Search Hotels
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        {/* Destination */}
        <input
          name="destination_place"
          placeholder="Destination City"
          value={formData.destination_place}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <div></div>

        {/* Dates */}
        <input
          type="date"
          name="checkin_date"
          value={formData.checkin_date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="checkout_date"
          value={formData.checkout_date}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        {/* Guests */}
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

        {/* Sort By */}
        <select
          name="hotel_sort_by"
          value={formData.hotel_sort_by}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value={3}>Lowest Price</option>
          <option value={8}>Highest Rating</option>
          <option value={13}>Most Reviewed</option>
        </select>

        <div></div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Searching Hotels..." : "Search Hotels"}
        </button>

      </form>

    </div>
  );
}