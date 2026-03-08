import axios from "axios";

export const searchHotels = async (data) => {

  const res = await axios.post(
    "http://127.0.0.1:8000/hotel/search",
    data
  );

  return res.data;
};