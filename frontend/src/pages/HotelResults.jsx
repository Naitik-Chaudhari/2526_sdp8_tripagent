import { useTrip } from "../context/TripContext";
import { useAuth } from "@clerk/clerk-react";
import { saveHotel } from "../api/hotelSaveApi";
import { useState } from "react";
import {
  Building2,
  Star,
  MapPin,
  Clock,
  Users,
  IndianRupee,
  ExternalLink,
  Save,
  Check,
  AlertCircle,
  Sparkles,
  Navigation,
  ChevronDown,
  ChevronUp,
  ArrowRightLeft
} from "lucide-react";

export default function HotelResults() {
  const { hotelResults, setHotelResults, tripId } = useTrip();
  const { getToken } = useAuth();

  const [saving, setSaving] = useState(false);
  const [expandedHotel, setExpandedHotel] = useState(null);

  // Loading state while results arrive
  if (!hotelResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            <Building2 className="absolute inset-0 m-auto w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Finding Perfect Hotels
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Searching for the best accommodations...
          </p>
        </div>
      </div>
    );
  }

  const { hotels, recommended_hotel, search_links } = hotelResults.hotel_results;

  // Handle selecting a different hotel as recommended
  const handleSelectHotel = (index) => {
    const selectedHotel = hotels[index];

    // Create new hotels array with current recommended added and selected removed
    const newHotels = [...hotels];
    newHotels.splice(index, 1);
    newHotels.unshift(recommended_hotel); // Add old recommended to beginning

    // Update context with swapped data
    setHotelResults({
      ...hotelResults,
      hotel_results: {
        ...hotelResults.hotel_results,
        recommended_hotel: selectedHotel,
        hotels: newHotels
      }
    });
  };

  const handleSaveHotel = async () => {
    try {
      setSaving(true);
      const token = await getToken();
      const res = await saveHotel(tripId, hotelResults, token);
      console.log("Save hotel response:", res);
      alert("Hotel saved successfully!");
    } catch (err) {
      console.error("Save hotel error:", err);
      if (err.response && err.response.status === 500) {
        alert("For this trip, hotel results already exist or request failed.");
      } else {
        alert("Something went wrong while saving the hotel.");
      }
    } finally {
      setSaving(false);
    }
  };

  const HotelCard = ({ hotel, isRecommended = false, index }) => {
    const isExpanded = expandedHotel === (isRecommended ? "recommended" : index);
    const cardId = isRecommended ? "recommended" : index;

    return (
      <div
        className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
          isRecommended
            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        }`}
      >
        {/* Header */}
        <div className={`p-5 ${isRecommended ? "" : "border-b border-gray-100 dark:border-gray-700"}`}>
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              {isRecommended && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium bg-white/20 px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                </div>
              )}
              <h3 className={`text-xl font-bold ${isRecommended ? "text-white" : "text-gray-800 dark:text-white"}`}>
                {hotel.name}
              </h3>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
              isRecommended ? "bg-white/20" : "bg-yellow-100 dark:bg-yellow-900/30"
            }`}>
              <Star className={`w-4 h-4 ${isRecommended ? "text-yellow-300" : "text-yellow-500"} fill-current`} />
              <span className={`font-bold ${isRecommended ? "text-white" : "text-yellow-700 dark:text-yellow-400"}`}>
                {hotel.rating}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className={`flex items-center gap-2 ${isRecommended ? "text-white/90" : "text-gray-600 dark:text-gray-300"}`}>
              <Users className="w-4 h-4" />
              <span className="text-sm">{hotel.reviews} reviews</span>
            </div>
            <div className={`flex items-center gap-2 ${isRecommended ? "text-white/90" : "text-gray-600 dark:text-gray-300"}`}>
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Location: {hotel.location_rating}/5</span>
            </div>
            <div className={`flex items-center gap-2 ${isRecommended ? "text-white/90" : "text-gray-600 dark:text-gray-300"}`}>
              <Clock className="w-4 h-4" />
              <span className="text-sm">{hotel.check_in_time}</span>
            </div>
            <div className={`flex items-center gap-2 font-semibold ${isRecommended ? "text-white" : "text-indigo-600 dark:text-indigo-400"}`}>
              <IndianRupee className="w-4 h-4" />
              <span className="text-sm">{hotel.price_per_night_inr}/night</span>
            </div>
          </div>

          {/* Price Highlight */}
          <div className={`mt-4 p-3 rounded-xl ${
            isRecommended ? "bg-white/10" : "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30"
          }`}>
            <div className="flex justify-between items-center">
              <span className={isRecommended ? "text-white/80" : "text-gray-600 dark:text-gray-400"}>
                Total Price
              </span>
              <div className="flex items-center gap-1">
                <IndianRupee className={`w-5 h-5 ${isRecommended ? "text-white" : "text-indigo-600 dark:text-indigo-400"}`} />
                <span className={`text-2xl font-bold ${isRecommended ? "text-white" : "text-indigo-600 dark:text-indigo-400"}`}>
                  {hotel.total_price_inr?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Section */}
        <div className={`${isRecommended ? "bg-white/10" : "bg-gray-50 dark:bg-gray-800/50"}`}>
          <button
            onClick={() => setExpandedHotel(isExpanded ? null : cardId)}
            className={`w-full px-5 py-3 flex items-center justify-between ${
              isRecommended ? "text-white/90 hover:bg-white/10" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
            } transition-colors`}
          >
            <span className="text-sm font-medium">
              {isExpanded ? "Hide Details" : "View Nearby Places"}
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className={`px-5 pb-5 ${isRecommended ? "text-white" : ""}`}>
              <div className="space-y-3">
                <h4 className={`font-semibold flex items-center gap-2 ${isRecommended ? "text-white" : "text-gray-800 dark:text-white"}`}>
                  <Navigation className="w-4 h-4" />
                  Nearby Places
                </h4>
                {hotel.nearby_places?.map((place, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      isRecommended ? "bg-white/10" : "bg-white dark:bg-gray-700 shadow-sm"
                    }`}
                  >
                    <span className={isRecommended ? "text-white" : "text-gray-700 dark:text-gray-200"}>
                      {place.name}
                    </span>
                    <span className={`text-sm ${isRecommended ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}>
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`p-4 flex gap-3 ${
          isRecommended ? "bg-white/5" : "bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700"
        }`}>
          {hotel.booking_link && (
            <a
              href={hotel.booking_link}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                isRecommended
                  ? "bg-white text-teal-600 hover:bg-gray-100"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              Book Now
            </a>
          )}
          {!isRecommended && (
            <button
              onClick={() => handleSelectHotel(index)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all"
            >
              <ArrowRightLeft className="w-4 h-4" />
              Select This
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Hotel Results
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            We found {hotels.length + 1} hotels for your stay
          </p>
        </div>

        {/* Save Button & Warning */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={handleSaveHotel}
            disabled={!tripId || saving}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all shadow-lg ${
              !tripId || saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl"
            }`}
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Hotel Selection
              </>
            )}
          </button>
          {!tripId && (
            <div className="flex items-center gap-2 mt-3 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Save your trip first before saving hotels</span>
            </div>
          )}
        </div>

        {/* Recommended Hotel */}
        {recommended_hotel && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Your Selected Hotel
              </h2>
            </div>
            <HotelCard hotel={recommended_hotel} isRecommended={true} />
          </div>
        )}

        {/* Other Hotels */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-500" />
            Other Available Hotels
          </h2>
          <div className="grid gap-6">
            {hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} index={index} />
            ))}
          </div>
        </div>

        {/* Google Hotels Link */}
        {search_links?.google_hotels_url && (
          <div className="text-center mt-8">
            <a
              href={search_links.google_hotels_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all border border-indigo-200 dark:border-indigo-800"
            >
              <ExternalLink className="w-5 h-5" />
              View More on Google Hotels
            </a>
          </div>
        )}
      </div>
    </div>
  );
}