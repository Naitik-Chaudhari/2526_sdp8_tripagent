import { useState, useEffect } from "react";
import { useTrip } from "../context/TripContext";
import { searchFlights } from "../api/flightApi";
import { useNavigate } from "react-router-dom";
import {
    Plane,
    MapPin,
    Calendar,
    Users,
    ArrowRight,
    Loader2,
    Search,
    Sparkles,
    ArrowRightLeft,
    Baby,
    User,
    SortAsc
} from "lucide-react";

export default function FlightSearchForm() {
    const navigate = useNavigate();
    const { flightSearchData, setFlightSearchData, setFlightResults } = useTrip();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        source_place: "",
        source_airport: "",
        destination_place: "",
        destination_airport: "",
        start_date: "",
        return_date: "",
        num_adults: 1,
        num_children: 0,
        travel_class: 1,
        flight_sort_by: 1,
    });

    // ---------------- AUTO FILL FORM ----------------
    useEffect(() => {
        if (flightSearchData) {
            setFormData(flightSearchData);
        }
    }, [flightSearchData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
                travel_class: Number(formData.travel_class),
                flight_sort_by: Number(formData.flight_sort_by),
            };

            setFlightSearchData(requestBody);
            const res = await searchFlights(requestBody);
            setFlightResults(res);
            navigate("/flight-results");
        } catch (err) {
            console.error("Flight search error:", err);
        } finally {
            setLoading(false);
        }
    };

    const travelClassOptions = [
        { value: 1, label: "Economy" },
        { value: 2, label: "Premium Economy" },
        { value: 3, label: "Business" },
        { value: 4, label: "First Class" },
    ];

    const sortOptions = [
        { value: 1, label: "Best Match" },
        { value: 2, label: "Price" },
        { value: 3, label: "Departure Time" },
        { value: 4, label: "Arrival Time" },
        { value: 5, label: "Duration" },
        { value: 6, label: "Emissions" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
                        <Plane className="h-4 w-4" />
                        Flight Booking
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                        Search Flights
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Find the best flights for your journey with real-time prices and availability
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Gradient Top Bar */}
                    <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600"></div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {/* From / To Section */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Route
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 relative">
                                {/* Source */}
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            From City
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                name="source_place"
                                                placeholder="Enter departure city"
                                                value={formData.source_place}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Airport Code (IATA)
                                        </label>
                                        <div className="relative">
                                            <Plane className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                name="source_airport"
                                                placeholder="e.g., DEL, BOM, JFK"
                                                value={formData.source_airport}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow Icon */}
                                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                                        <ArrowRightLeft className="h-5 w-5 text-white" />
                                    </div>
                                </div>

                                {/* Destination */}
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            To City
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                name="destination_place"
                                                placeholder="Enter destination city"
                                                value={formData.destination_place}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Airport Code (IATA)
                                        </label>
                                        <div className="relative">
                                            <Plane className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90" />
                                            <input
                                                name="destination_airport"
                                                placeholder="e.g., GOI, DXB, LHR"
                                                value={formData.destination_airport}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition uppercase"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dates Section */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Travel Dates
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Departure Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="date"
                                            name="start_date"
                                            value={formData.start_date}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Return Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="date"
                                            name="return_date"
                                            value={formData.return_date}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Passengers Section */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Passengers
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Adults
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="number"
                                            name="num_adults"
                                            min="1"
                                            max="9"
                                            value={formData.num_adults}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Children
                                    </label>
                                    <div className="relative">
                                        <Baby className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="number"
                                            name="num_children"
                                            min="0"
                                            max="9"
                                            value={formData.num_children}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preferences Section */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                Preferences
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Travel Class
                                    </label>
                                    <div className="relative">
                                        <Plane className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            name="travel_class"
                                            value={formData.travel_class}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
                                        >
                                            {travelClassOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Sort Results By
                                    </label>
                                    <div className="relative">
                                        <SortAsc className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <select
                                            name="flight_sort_by"
                                            value={formData.flight_sort_by}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer"
                                        >
                                            {sortOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:via-cyan-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Searching Flights...
                                </>
                            ) : (
                                <>
                                    <Search className="h-5 w-5" />
                                    Search Flights
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Plane className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Real-time prices from multiple airlines</p>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered best flight recommendations</p>
                    </div>
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Flexible dates & easy rebooking</p>
                    </div>
                </div>
            </div>
        </div>
    );
}