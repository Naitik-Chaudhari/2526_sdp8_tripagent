import axios from "axios";

export const saveFlight = async (tripId, flightData, token) => {

  const res = await axios.post(
    `http://localhost:5000/api/trips/${tripId}/flights`,
    flightData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
};