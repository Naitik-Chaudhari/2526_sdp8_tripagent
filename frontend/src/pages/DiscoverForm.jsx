import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { discoverTrip } from "../api/tripApi";
import { useTrip } from "../context/TripContext";
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  Loader2
} from "lucide-react";

export default function DiscoverForm() {
  const navigate = useNavigate();
  const { setDiscoverData } = useTrip();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    destination_place: "",
    start_date: "",
    end_date: "",
    user_summary: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await discoverTrip(form);
      setDiscoverData(res.data);
      navigate("/discover-result");
    } catch (error) {
      console.error("Failed to discover trip:", error);
      alert("Failed to discover destination. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            <Compass className="h-4 w-4" />
            AI Destination Discovery
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Discover Your Trip
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Let AI analyze your destination and suggest the best zones, areas, and day-wise strategy for your trip.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Enter Destination Details
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              Tell us where and when you want to explore
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Destination */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4 text-indigo-600" />
                Destination
              </label>
              <input
                type="text"
                placeholder="e.g., Goa, Jaipur, Kerala, Ladakh"
                value={form.destination_place}
                onChange={(e) =>
                  setForm({ ...form, destination_place: e.target.value })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
              />
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.start_date}
                  min={today}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  End Date
                </label>
                <input
                  type="date"
                  value={form.end_date}
                  min={form.start_date || today}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                />
              </div>
            </div>

            {/* User Summary / Interests */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                What do you want to explore? (Optional)
              </label>
              <textarea
                placeholder="e.g., Relaxed trip with beaches, nightlife and local food. Love adventure sports and photography."
                value={form.user_summary}
                onChange={(e) =>
                  setForm({ ...form, user_summary: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 resize-none transition-all"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Describe your travel style to get personalized zone recommendations
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Discovering...
                </>
              ) : (
                <>
                  <Compass className="h-5 w-5" />
                  Discover Trip
                </>
              )}
            </button>
          </form>
        </div>

        {/* Helper Text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Our AI will analyze your destination and create a personalized zone strategy
        </p>
      </div>
    </div>
  );
}