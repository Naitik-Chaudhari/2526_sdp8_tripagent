import axios from "axios";

export const saveTrip = async (tripData, token) => {
  const response = await axios.post(
    "http://localhost:5000/api/trips/save",
    tripData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};