import { useTrip } from "../context/TripContext";
import { useAuth } from "@clerk/clerk-react";
import { saveFlight } from "../api/flightSaveApi";
import { useState } from "react";
import {
  Plane,
  Clock,
  MapPin,
  Leaf,
  ExternalLink,
  Save,
  Loader2,
  Star,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  ArrowUpDown
} from "lucide-react";

export default function FlightResults() {
  const { flightResults, setFlightResults, tripId } = useTrip();
  const { getToken } = useAuth();

  const [saving, setSaving] = useState(false);
  const [expandedFlight, setExpandedFlight] = useState(null);

  // Loading state while results arrive
  if (!flightResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Animated circles background */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-200 dark:bg-blue-800/30 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-cyan-200 dark:bg-cyan-800/30 rounded-full animate-ping opacity-30 animation-delay-500"></div>
            </div>
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Plane className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Searching Best Flights
          </h2>
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-6">
            Finding the perfect flights for your journey...
          </p>

          <Loader2 className="h-6 w-6 text-blue-600 animate-spin mx-auto" />

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Comparing prices from multiple airlines
          </p>
        </div>
      </div>
    );
  }

  const { best_flights, recommended_flight, search_links } =
    flightResults.flight_results;

  // Handle selecting a flight from "Other Flights" - swap it with recommended and update context
  const handleSelectFlight = (index) => {
    const selectedFlight = best_flights[index];
    const previousRecommended = recommended_flight;

    // Create new other flights list
    const newOtherFlights = [...best_flights];
    newOtherFlights.splice(index, 1); // Remove selected from list
    if (previousRecommended) {
      newOtherFlights.unshift(previousRecommended); // Add previous recommended to beginning
    }

    // Update context with swapped data
    setFlightResults({
      ...flightResults,
      flight_results: {
        ...flightResults.flight_results,
        recommended_flight: selectedFlight,
        best_flights: newOtherFlights
      }
    });
  };

  const handleSaveFlight = async () => {
    try {
      setSaving(true);
      const token = await getToken();

      // Create modified flight results with only the recommended flight
      const modifiedFlightResults = {
        ...flightResults,
        flight_results: {
          ...flightResults.flight_results,
          recommended_flight: recommended_flight,
          best_flights: [] // Only save the recommended one
        }
      };

      const res = await saveFlight(tripId, modifiedFlightResults, token);
      alert("Flight saved successfully!");
      console.log(res);
    } catch (err) {
      console.error("Save flight error:", err);
      if (err.response && err.response.status === 500) {
        alert("For this trip, flight results already exist or request failed.");
      } else {
        alert("Something went wrong while saving the flight.");
      }
    } finally {
      setSaving(false);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Helper to get carbon emissions display value
  const getCarbonEmissions = (emissions) => {
    if (!emissions) return "N/A";
    // If it's an object, extract the this_flight value
    if (typeof emissions === "object") {
      return emissions.this_flight || emissions.typical_for_this_route || "N/A";
    }
    // If it's already a string/number, return it
    return emissions;
  };

  const FlightCard = ({ flight, isRecommended = false, index }) => {
    const isExpanded = expandedFlight === (isRecommended ? 'recommended' : index);
    const cardId = isRecommended ? 'recommended' : index;

    return (
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl ${isRecommended ? 'ring-2 ring-green-500' : ''
          }`}
      >
        {/* Recommended Badge */}
        {isRecommended && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold shadow-lg">
              <Check className="h-4 w-4" />
              Selected
            </div>
          </div>
        )}

        {/* Card Header */}
        <div className={`px-6 py-4 ${isRecommended ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{flight.airline}</h3>
              <p className="text-white/80 text-sm">{flight.route}</p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Main Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* Price */}
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{flight.price_per_adult?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">per adult</p>
            </div>

            {/* Duration */}
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-blue-500" />
                {formatDuration(flight.total_duration_min)}
              </p>
            </div>

            {/* Stops */}
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Stops</p>
              <p className={`text-xl font-bold ${flight.stops === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
              </p>
            </div>

            {/* Emissions */}
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-gray-400">Carbon</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                <Leaf className="h-4 w-4 text-green-500" />
                {getCarbonEmissions(flight.carbon_emissions)}
              </p>
            </div>
          </div>

          {/* Action Buttons Row */}
          {!isRecommended && (
            <div className="mb-2">
              <button
                onClick={() => handleSelectFlight(index)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
              >
                <ArrowUpDown className="h-4 w-4" />
                Select This Flight
              </button>
            </div>
          )}

          {isRecommended && (
            <div className="mb-2">
              <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl font-medium">
                <CheckCircle className="h-4 w-4" />
                This flight will be saved
              </div>
            </div>
          )}

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setExpandedFlight(isExpanded ? null : cardId)}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
          >
            {isExpanded ? (
              <>
                Hide Flight Details
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                View Flight Details
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Expanded Leg Details */}
          {isExpanded && (
            <div className="mt-4 space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Flight Segments
              </h4>
              {flight.legs.map((leg, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                >
                  {/* Departure */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {leg.departure_time}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {leg.from}
                    </p>
                  </div>

                  {/* Flight Path */}
                  <div className="flex-1 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                    <div className="flex flex-col items-center">
                      <Plane className="h-4 w-4 text-blue-500 rotate-90" />
                      <p className="text-xs text-gray-400 mt-1">{leg.flight_number}</p>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                  </div>

                  {/* Arrival */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {leg.arrival_time}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {leg.to}
                    </p>
                  </div>

                  {/* Aircraft */}
                  <div className="hidden md:block text-right">
                    <p className="text-xs text-gray-400">Aircraft</p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {leg.aircraft}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Flights Found
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Flight Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {(best_flights?.length || 0) + (recommended_flight ? 1 : 0)} flights found for your journey
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleSaveFlight}
            disabled={!tripId || saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Selected Flight
              </>
            )}
          </button>

          <a
            href={search_links?.google_flights_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
          >
            <ExternalLink className="h-5 w-5" />
            View on Google Flights
          </a>
        </div>

        {/* Warning if trip not saved */}
        {!tripId && (
          <div className="flex items-center gap-3 p-4 mb-6 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Save your trip first before saving flight results.
            </p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-6">
          {/* Selected/Recommended Flight */}
          {recommended_flight && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-500" />
                Selected Flight
                <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  Will be saved
                </span>
              </h2>
              <FlightCard flight={recommended_flight} isRecommended={true} />
            </div>
          )}

          {/* Other Flights */}
          {best_flights && best_flights.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Plane className="h-5 w-5 text-blue-500" />
                Other Available Flights
                <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                  Click to select
                </span>
              </h2>
              <div className="space-y-4">
                {best_flights.map((flight, index) => (
                  <FlightCard key={index} flight={flight} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
              <Plane className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(best_flights?.length || 0) + (recommended_flight ? 1 : 0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Flights Found</p>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{recommended_flight?.price_per_adult?.toLocaleString() || '--'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Selected Price</p>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatDuration(recommended_flight?.total_duration_min || 0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Selected Duration</p>
          </div>
        </div>
      </div>
    </div>
  );
}