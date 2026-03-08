import { useTrip } from "../context/TripContext";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { saveTrip } from "../api/tripSaveApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  Hotel,
  Save,
  MapPin,
  Clock,
  Sun,
  Cloud,
  Star,
  ExternalLink,
  X,
  Calendar,
  Sparkles,
  Loader2,
  Sunrise,
  Sunset,
  Moon,
  ChevronRight,
  CheckCircle
} from "lucide-react";

// Get time icon based on schedule time
const getTimeIcon = (time) => {
  const lower = time?.toLowerCase() || "";
  if (lower.includes("morning")) return Sunrise;
  if (lower.includes("afternoon")) return Sun;
  if (lower.includes("evening")) return Sunset;
  if (lower.includes("night")) return Moon;
  return Clock;
};

// Get time color based on schedule time
const getTimeColor = (time) => {
  const lower = time?.toLowerCase() || "";
  if (lower.includes("morning")) return "from-amber-500 to-orange-500";
  if (lower.includes("afternoon")) return "from-yellow-500 to-amber-500";
  if (lower.includes("evening")) return "from-purple-500 to-pink-500";
  if (lower.includes("night")) return "from-indigo-600 to-purple-600";
  return "from-blue-500 to-cyan-500";
};

export default function TripPlan() {
  const { discoverData, tripPlan, setTripPlan, setTripId, setFlightSearchData, setHotelSearchData } = useTrip();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  // Loading steps for animation
  const loadingSteps = [
    { text: "Analyzing your preferences...", icon: Sparkles },
    { text: "Finding best places to visit...", icon: MapPin },
    { text: "Checking weather conditions...", icon: Cloud },
    { text: "Optimizing your itinerary...", icon: Calendar },
    { text: "Almost ready...", icon: Star },
  ];

  // Animate loading steps
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // ---------------- PLAN TRIP API ----------------
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/plan-trip",
          discoverData
        );
        setTripPlan(res.data);
      } catch (err) {
        console.error("Plan trip error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!tripPlan) {
      fetchPlan();
    } else {
      setLoading(false);
    }
  }, []);

  // ---------------- PLACE CLICK ----------------
  const handlePlaceClick = (zone, placeName) => {
    const recommendedPlaces = tripPlan.references.places.recommended_places;
    const zoneData = recommendedPlaces[zone];
    if (!zoneData) return;

    const categories = zoneData.categories;
    for (const category in categories) {
      const found = categories[category].find((p) => p.name === placeName);
      if (found) {
        setSelectedPlace(found);
        return;
      }
    }
  };

  // ---------------- SAVE TRIP ----------------
  const handleSaveTrip = async () => {
    try {
      const token = await getToken();
      const res = await saveTrip(tripPlan, token);
      const tripId = res.trip.id;
      setTripId(tripId);
      alert(`Trip saved successfully!\nTrip ID: ${tripId}`);
    } catch (error) {
      console.error("Save trip error:", error);
    }
  };

  // ---------------- SEARCH FLIGHTS ----------------
  const handleSearchFlights = () => {
    const flightData = {
      source_place: "",
      source_airport: "",
      destination_place: tripPlan.destination_place,
      destination_airport: "",
      start_date: tripPlan.start_date,
      return_date: tripPlan.end_date,
      num_adults: 1,
      num_children: 0,
      travel_class: 1,
      flight_sort_by: 1,
    };
    setFlightSearchData(flightData);
    navigate("/flight-search");
  };

  // ---------------- SEARCH HOTELS ----------------
  const handleSearchHotels = () => {
    if (!tripPlan) return;
    const requestBody = {
      destination_place: tripPlan.destination_place,
      checkin_date: tripPlan.start_date,
      checkout_date: tripPlan.end_date,
      num_adults: 2,
      num_children: 0,
      hotel_sort_by: 3,
    };
    setHotelSearchData(requestBody);
    navigate("/hotel-search");
  };

  // ---------------- LOADING STATE ----------------
  if (loading) {
    const CurrentIcon = loadingSteps[loadingStep].icon;
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Animated circles background */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-indigo-200 dark:bg-indigo-800/30 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-purple-200 dark:bg-purple-800/30 rounded-full animate-ping opacity-30 animation-delay-500"></div>
            </div>
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CurrentIcon className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>

          {/* Loading text */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Creating Your Perfect Trip
          </h2>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-6 h-6 transition-all">
            {loadingSteps[loadingStep].text}
          </p>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {loadingSteps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${i === loadingStep
                    ? "bg-indigo-600 w-6"
                    : i < loadingStep
                      ? "bg-indigo-400 w-2"
                      : "bg-gray-300 dark:bg-gray-600 w-2"
                  }`}
              />
            ))}
          </div>

          {/* Spinner */}
          <Loader2 className="h-6 w-6 text-indigo-600 animate-spin mx-auto" />

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            This may take a minute. We're crafting something special for you!
          </p>
        </div>
      </div>
    );
  }

  // ---------------- NO DATA STATE ----------------
  if (!tripPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">No itinerary found</p>
          <button
            onClick={() => navigate("/discover")}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Start Planning
          </button>
        </div>
      </div>
    );
  }

  // ---------------- MAIN CONTENT ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Itinerary Ready
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {tripPlan.destination_place}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            {tripPlan.trip_duration_days} days of adventure awaits
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={handleSaveTrip}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Save className="h-5 w-5 group-hover:animate-pulse" />
            Save Trip
          </button>
          <button
            onClick={handleSearchFlights}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Plane className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            Search Flights
          </button>
          <button
            onClick={handleSearchHotels}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Hotel className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Search Hotels
          </button>
        </div>

        {/* Trip Overview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
              <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="font-bold text-gray-900 dark:text-white">{tripPlan.trip_duration_days} Days</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Zones</p>
              <p className="font-bold text-gray-900 dark:text-white">{tripPlan.itinerary?.daily_itinerary?.length || 0}</p>
            </div>
            <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/30 rounded-xl">
              <Star className="h-6 w-6 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Activities</p>
              <p className="font-bold text-gray-900 dark:text-white">
                {tripPlan.itinerary?.daily_itinerary?.reduce((acc, day) => acc + (day.schedule?.length || 0), 0)}
              </p>
            </div>
            <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl">
              <Sparkles className="h-6 w-6 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Powered</p>
              <p className="font-bold text-gray-900 dark:text-white">Smart Plan</p>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-6">
          {tripPlan.itinerary.daily_itinerary.map((day, dayIndex) => (
            <div
              key={day.day_number}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl"
              style={{ animationDelay: `${dayIndex * 100}ms` }}
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm w-14 h-14 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-white/80 text-xs">DAY</span>
                      <span className="text-white text-xl font-bold">{day.day_number}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{day.zone}</h2>
                      <p className="text-white/80 flex items-center gap-1 text-sm">
                        <MapPin className="h-3.5 w-3.5" />
                        {day.schedule?.length || 0} places to visit
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    {day.weather?.toLowerCase().includes("sun") ? (
                      <Sun className="h-5 w-5 text-yellow-300" />
                    ) : (
                      <Cloud className="h-5 w-5 text-white" />
                    )}
                    <span className="text-white font-medium">{day.weather}</span>
                  </div>
                </div>
              </div>

              {/* Schedule Items */}
              <div className="p-6 space-y-4">
                {day.schedule.map((item, i) => {
                  const TimeIcon = getTimeIcon(item.time);
                  const timeGradient = getTimeColor(item.time);
                  return (
                    <div
                      key={i}
                      className="group flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
                      onClick={() => handlePlaceClick(day.zone, item.place)}
                    >
                      {/* Time Badge */}
                      <div
                        className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${timeGradient} rounded-xl flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}
                      >
                        <TimeIcon className="h-6 w-6" />
                        <span className="text-xs font-medium mt-1 capitalize">
                          {item.time?.split(" ")[0]}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">
                            {item.place}
                          </h3>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        {item.must_enjoy && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="font-medium">Must Try:</span> {item.must_enjoy}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Place Detail Modal */}
        {selectedPlace && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setSelectedPlace(null)}
            />
            {/* Modal */}
            <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-2xl shadow-2xl z-50 max-w-md w-full overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white pr-8">
                    {selectedPlace.name}
                  </h3>
                  <button
                    onClick={() => setSelectedPlace(null)}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1.5 rounded-full">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{selectedPlace.rating}</span>
                  </div>
                  {/* Type */}
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-full text-sm font-medium">
                    {selectedPlace.type}
                  </div>
                </div>

                {/* Google Maps Link */}
                <a
                  href={selectedPlace.google_maps_link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105"
                >
                  <ExternalLink className="h-5 w-5" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}