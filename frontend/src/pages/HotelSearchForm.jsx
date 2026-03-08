import { useState, useEffect, useRef } from "react";
import { useTrip } from "../context/TripContext";
import { searchHotels } from "../api/hotelApi";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  Users,
  Baby,
  SortAsc,
  Search,
  MapPin,
  Loader2,
  Hotel,
  Star,
  DollarSign,
  MessageSquare
} from "lucide-react";

// Popular destinations database
const destinationDatabase = [
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Delhi", state: "Delhi" },
  { city: "Bangalore", state: "Karnataka" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Goa", state: "Goa" },
  { city: "Udaipur", state: "Rajasthan" },
  { city: "Jodhpur", state: "Rajasthan" },
  { city: "Varanasi", state: "Uttar Pradesh" },
  { city: "Agra", state: "Uttar Pradesh" },
  { city: "Shimla", state: "Himachal Pradesh" },
  { city: "Manali", state: "Himachal Pradesh" },
  { city: "Darjeeling", state: "West Bengal" },
  { city: "Ooty", state: "Tamil Nadu" },
  { city: "Munnar", state: "Kerala" },
  { city: "Kochi", state: "Kerala" },
  { city: "Mysore", state: "Karnataka" },
  { city: "Rishikesh", state: "Uttarakhand" },
  { city: "Dehradun", state: "Uttarakhand" },
  { city: "Amritsar", state: "Punjab" },
  { city: "Leh", state: "Ladakh" },
  { city: "Srinagar", state: "Jammu & Kashmir" },
  { city: "Coorg", state: "Karnataka" },
  { city: "Pondicherry", state: "Puducherry" },
  { city: "Mount Abu", state: "Rajasthan" },
  { city: "Gangtok", state: "Sikkim" },
  { city: "Shillong", state: "Meghalaya" },
  { city: "Andaman", state: "Andaman & Nicobar" },
  { city: "Guwahati", state: "Assam" },
  { city: "Bhopal", state: "Madhya Pradesh" },
  { city: "Indore", state: "Madhya Pradesh" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Chandigarh", state: "Chandigarh" },
  { city: "Coimbatore", state: "Tamil Nadu" },
  { city: "Vizag", state: "Andhra Pradesh" },
  { city: "Tirupati", state: "Andhra Pradesh" }
];

// Destination Autocomplete Component
const DestinationAutocomplete = ({ value, onChange, name, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (val.length >= 1) {
      const filtered = destinationDatabase.filter(
        (dest) =>
          dest.city.toLowerCase().includes(val.toLowerCase()) ||
          dest.state.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }

    onChange({ target: { name, value: val } });
  };

  const handleSelect = (dest) => {
    setInputValue(dest.city);
    onChange({ target: { name, value: dest.city } });
    setShowDropdown(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue.length >= 1 && setShowDropdown(true)}
          placeholder={placeholder}
          required
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((dest, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(dest)}
              className="px-4 py-3 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <Building2 className="w-4 h-4 text-indigo-500" />
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {dest.city}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                  {dest.state}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function HotelSearchForm() {
  const navigate = useNavigate();
  const { hotelSearchData, setHotelSearchData, setHotelResults } = useTrip();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination_place: "",
    checkin_date: "",
    checkout_date: "",
    num_adults: 1,
    num_children: 0,
    hotel_sort_by: 3
  });

  useEffect(() => {
    if (hotelSearchData) {
      setFormData(hotelSearchData);
    }
  }, [hotelSearchData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const requestBody = {
        ...formData,
        num_adults: Number(formData.num_adults),
        num_children: Number(formData.num_children),
        hotel_sort_by: Number(formData.hotel_sort_by)
      };

      setHotelSearchData(requestBody);

      const res = await searchHotels(requestBody);
      setHotelResults(res);
      navigate("/hotel-results");
    } catch (err) {
      console.error("Hotel search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getSortIcon = (value) => {
    switch (Number(value)) {
      case 3:
        return <DollarSign className="w-4 h-4" />;
      case 8:
        return <Star className="w-4 h-4" />;
      case 13:
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <SortAsc className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Hotel className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Perfect Stay
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Search and compare hotels at the best prices
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-2 text-white">
              <Search className="w-5 h-5" />
              <span className="font-semibold">Hotel Search</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Destination Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Building2 className="w-4 h-4 text-indigo-500" />
                Destination
              </label>
              <DestinationAutocomplete
                name="destination_place"
                value={formData.destination_place}
                onChange={handleChange}
                placeholder="Where are you going?"
              />
            </div>

            {/* Dates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <CalendarDays className="w-4 h-4 text-indigo-500" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkin_date"
                  value={formData.checkin_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <CalendarDays className="w-4 h-4 text-purple-500" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkout_date"
                  value={formData.checkout_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200"
                />
              </div>
            </div>

            {/* Guests Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                <Users className="w-4 h-4 text-indigo-500" />
                Guests
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    Adults
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="num_adults"
                      min="1"
                      max="10"
                      value={formData.num_adults}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Baby className="w-4 h-4" />
                    Children
                  </label>
                  <input
                    type="number"
                    name="num_children"
                    min="0"
                    max="10"
                    value={formData.num_children}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                               transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Sort Preference */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <SortAsc className="w-4 h-4 text-indigo-500" />
                Sort Results By
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                  {getSortIcon(formData.hotel_sort_by)}
                </div>
                <select
                  name="hotel_sort_by"
                  value={formData.hotel_sort_by}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value={3}>Lowest Price</option>
                  <option value={8}>Highest Rating</option>
                  <option value={13}>Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl
                         font-semibold text-lg shadow-lg hover:shadow-xl
                         hover:from-indigo-600 hover:to-purple-700
                         disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                         transform hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching Hotels...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Search Hotels
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Best Prices</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Compare rates</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Top Rated</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Verified reviews</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white text-sm">Great Locations</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Near attractions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}