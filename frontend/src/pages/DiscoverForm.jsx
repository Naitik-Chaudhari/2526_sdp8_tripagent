import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { discoverTrip } from "../api/tripApi";
import { useTrip } from "../context/TripContext";

export default function DiscoverForm() {
  const navigate = useNavigate();
  const { setDiscoverData } = useTrip();

  const [form, setForm] = useState({
    destination_place: "",
    start_date: "",
    end_date: "",
    user_summary: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await discoverTrip(form);

    setDiscoverData(res.data);

    navigate("/discover-result");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">Discover Your Trip</h1>
        <form onSubmit={handleSubmit}>
        <input
            placeholder="Destination"
            onChange={(e) =>
            setForm({ ...form, destination_place: e.target.value })
            }
        />

        <input
            type="date"
            onChange={(e) =>
            setForm({ ...form, start_date: e.target.value })
            }
        />

        <input
            type="date"
            onChange={(e) =>
            setForm({ ...form, end_date: e.target.value })
            }
        />

        <textarea
            placeholder="What do you want to explore?"
            onChange={(e) =>
            setForm({ ...form, user_summary: e.target.value })
            }
        />

        <button type="submit">Discover Trip</button>
        </form>
    </div>
  );
}