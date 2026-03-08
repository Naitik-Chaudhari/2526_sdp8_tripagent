import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const discoverTrip = (data) =>
  API.post("/trip/discover", data);

export const planTrip = (data) =>
  API.post("/plan-trip", data);