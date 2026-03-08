import { useTrip } from "../context/TripContext";
import { useNavigate } from "react-router-dom";
import {
  Map,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Sparkles,
  Compass,
  Sun,
  ArrowRight
} from "lucide-react";

export default function DiscoverResult() {
  const { discoverData } = useTrip();
  const navigate = useNavigate();

  if (!discoverData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Compass className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">No trip data found.</p>
          <button
            onClick={() => navigate("/discover")}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Discover a Trip
          </button>
        </div>
      </div>
    );
  }

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Trip Discovered Successfully
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {discoverData.destination_place}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your personalized trip structure is ready
          </p>
        </div>

        {/* Trip Overview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Trip Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4 text-center">
                <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {formatDate(discoverData.start_date)}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">End Date</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {formatDate(discoverData.end_date)}
                </p>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/30 rounded-xl p-4 text-center">
                <Clock className="h-6 w-6 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {discoverData.trip_duration_days} Days
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 text-center">
                <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Arrival Zone</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {discoverData.arrival_day_zone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Zones Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Map className="h-5 w-5" />
              Discovered Zones
            </h2>
            <p className="text-emerald-100 text-sm mt-1">
              {discoverData.zones?.length || 0} unique areas to explore
            </p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {discoverData.zones?.map((zone) => (
                <div
                  key={zone.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-750"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {zone.name}
                    </h3>
                    <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-full font-medium">
                      {zone.recommended_days} day{zone.recommended_days > 1 ? "s" : ""}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic">
                    "{zone.vibe}"
                  </p>
                  
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Ideal For
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {zone.ideal_for?.map((item, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Day Zone Strategy Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Day-wise Zone Strategy
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Your optimized daily exploration plan
            </p>
          </div>
          <div className="p-6">
            {/* Arrival Day */}
            <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Day 1 - Arrival Day
                  </p>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    📍 {discoverData.arrival_day_zone} • Light exploration
                  </p>
                </div>
                <Sun className="h-6 w-6 text-amber-500" />
              </div>
            </div>

            {/* Planning Days */}
            <div className="space-y-3">
              {Object.entries(discoverData.day_zone_strategy || {}).map(([day, zone]) => {
                const dayNum = day.replace("day_", "");
                return (
                  <div
                    key={day}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  >
                    <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                      {dayNum}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Day {dayNum}
                      </p>
                      <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                        📍 {zone}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/plan-trip")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Plan Full Trip
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Continue to add flights, hotels, and detailed itinerary
          </p>
        </div>
      </div>
    </div>
  );
}