import axios from "axios";

export const saveHotel = async (tripId, hotelResults, token) => {

  const res = await axios.post(
    `http://localhost:5000/api/trips/${tripId}/hotels`,
    hotelResults,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
};