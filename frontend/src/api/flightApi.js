import axios from "axios";

export const searchFlights = async (data) => {

  const res = await axios.post(
    "http://127.0.0.1:8000/flight/search",
    data
  );

  return res.data;
};