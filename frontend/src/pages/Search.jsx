import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, Plane, Hotel, Users, Calendar, ArrowRight } from 'lucide-react'
import { useTripContext } from '../context/TripContext'

function Search() {
    const navigate = useNavigate()
    const { updateTripData, setIsLoading } = useTripContext()

    const [formData, setFormData] = useState({
        // Flight Details
        source_place: '',
        source_airport: '',
        destination_place: '',
        destination_airport: '',
        outbound_date: '',
        return_date: '',
        trip_duration_days: '',
        travel_class: 'economy',

        // Passengers
        number_of_adults: 1,
        number_of_children: 0,

        // Hotel Details
        hotel_sort_by: 'popularity',
        hotel_class: '3',
        check_in_date: '',
        check_out_date: '',
    })

    const [errors, setErrors] = useState({})

    // Auto-calculate trip duration when dates change
    useEffect(() => {
        if (formData.outbound_date && formData.return_date) {
            const outbound = new Date(formData.outbound_date)
            const returnDate = new Date(formData.return_date)
            const diffTime = Math.abs(returnDate - outbound)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            setFormData(prev => ({ ...prev, trip_duration_days: diffDays }))
        }
    }, [formData.outbound_date, formData.return_date])

    // Auto-sync hotel dates with flight dates
    useEffect(() => {
        if (formData.outbound_date && !formData.check_in_date) {
            setFormData(prev => ({ ...prev, check_in_date: formData.outbound_date }))
        }
        if (formData.return_date && !formData.check_out_date) {
            setFormData(prev => ({ ...prev, check_out_date: formData.return_date }))
        }
    }, [formData.outbound_date, formData.return_date])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.source_place.trim()) {
            newErrors.source_place = 'Source city is required'
        }
        if (!formData.source_airport.trim()) {
            newErrors.source_airport = 'Source airport code is required'
        }
        if (!formData.destination_place.trim()) {
            newErrors.destination_place = 'Destination city is required'
        }
        if (!formData.destination_airport.trim()) {
            newErrors.destination_airport = 'Destination airport code is required'
        }
        if (!formData.outbound_date) {
            newErrors.outbound_date = 'Departure date is required'
        }
        if (!formData.return_date) {
            newErrors.return_date = 'Return date is required'
        }
        if (formData.outbound_date && formData.return_date) {
            if (new Date(formData.return_date) <= new Date(formData.outbound_date)) {
                newErrors.return_date = 'Return date must be after departure date'
            }
        }
        if (formData.number_of_adults < 1) {
            newErrors.number_of_adults = 'At least 1 adult is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        updateTripData(formData)
        setIsLoading(true)
        navigate('/results')
    }

    // Dropdown options
    const travelClassOptions = [
        { value: 'economy', label: 'Economy' },
        { value: 'premium_economy', label: 'Premium Economy' },
        { value: 'business', label: 'Business' },
        { value: 'first', label: 'First Class' },
    ]

    const hotelSortOptions = [
        { value: 'popularity', label: 'Popularity' },
        { value: 'price_low', label: 'Price: Low to High' },
        { value: 'price_high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Guest Rating' },
        { value: 'stars', label: 'Star Rating' },
        { value: 'distance', label: 'Distance from Center' },
    ]

    const hotelClassOptions = [
        { value: '1', label: '1 Star' },
        { value: '2', label: '2 Stars' },
        { value: '3', label: '3 Stars' },
        { value: '4', label: '4 Stars' },
        { value: '5', label: '5 Stars' },
    ]

    // Get today's date for min date validation
    const today = new Date().toISOString().split('T')[0]

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <SearchIcon className="h-7 w-7" />
                        Plan Your Trip
                    </h2>
                    <p className="text-blue-100 mt-1">Search flights and hotels for your perfect getaway</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">

                    {/* Flight Details Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b pb-2">
                            <Plane className="h-5 w-5 text-blue-600" />
                            Flight Details
                        </div>

                        {/* Source & Destination */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Source */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-700">From</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="source_place"
                                            value={formData.source_place}
                                            onChange={handleChange}
                                            placeholder="e.g., New Delhi"
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.source_place ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.source_place && <p className="text-sm text-red-500 mt-1">{errors.source_place}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Airport Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="source_airport"
                                            value={formData.source_airport}
                                            onChange={handleChange}
                                            placeholder="e.g., DEL"
                                            maxLength={3}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase transition-all ${errors.source_airport ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.source_airport && <p className="text-sm text-red-500 mt-1">{errors.source_airport}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Arrow Icon (visible on md+) */}
                            <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                                <ArrowRight className="h-6 w-6 text-blue-500" />
                            </div>

                            {/* Destination */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-700">To</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="destination_place"
                                            value={formData.destination_place}
                                            onChange={handleChange}
                                            placeholder="e.g., London"
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.destination_place ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.destination_place && <p className="text-sm text-red-500 mt-1">{errors.destination_place}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Airport Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="destination_airport"
                                            value={formData.destination_airport}
                                            onChange={handleChange}
                                            placeholder="e.g., LHR"
                                            maxLength={3}
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase transition-all ${errors.destination_airport ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.destination_airport && <p className="text-sm text-red-500 mt-1">{errors.destination_airport}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Travel Dates */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Calendar className="inline h-4 w-4 mr-1" />
                                    Departure Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="outbound_date"
                                    value={formData.outbound_date}
                                    onChange={handleChange}
                                    min={today}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.outbound_date ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.outbound_date && <p className="text-sm text-red-500 mt-1">{errors.outbound_date}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Calendar className="inline h-4 w-4 mr-1" />
                                    Return Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="return_date"
                                    value={formData.return_date}
                                    onChange={handleChange}
                                    min={formData.outbound_date || today}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.return_date ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.return_date && <p className="text-sm text-red-500 mt-1">{errors.return_date}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trip Duration
                                </label>
                                <input
                                    type="text"
                                    value={formData.trip_duration_days ? `${formData.trip_duration_days} days` : 'Auto-calculated'}
                                    disabled
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
                                />
                            </div>
                        </div>

                        {/* Travel Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Travel Class
                            </label>
                            <select
                                name="travel_class"
                                value={formData.travel_class}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
                            >
                                {travelClassOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Passengers Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b pb-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Passengers
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Adults (12+ years) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="number_of_adults"
                                    value={formData.number_of_adults}
                                    onChange={handleChange}
                                    min="1"
                                    max="9"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.number_of_adults ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.number_of_adults && <p className="text-sm text-red-500 mt-1">{errors.number_of_adults}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Children (2-11 years)
                                </label>
                                <input
                                    type="number"
                                    name="number_of_children"
                                    value={formData.number_of_children}
                                    onChange={handleChange}
                                    min="0"
                                    max="9"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Total Passengers Display */}
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-blue-800 font-medium">
                                Total Passengers: {Number(formData.number_of_adults) + Number(formData.number_of_children)}
                            </p>
                        </div>
                    </div>

                    {/* Hotel Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 border-b pb-2">
                            <Hotel className="h-5 w-5 text-blue-600" />
                            Hotel Preferences
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sort Hotels By
                                </label>
                                <select
                                    name="hotel_sort_by"
                                    value={formData.hotel_sort_by}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
                                >
                                    {hotelSortOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hotel Class
                                </label>
                                <select
                                    name="hotel_class"
                                    value={formData.hotel_class}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all"
                                >
                                    {hotelClassOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Calendar className="inline h-4 w-4 mr-1" />
                                    Check-in Date
                                </label>
                                <input
                                    type="date"
                                    name="check_in_date"
                                    value={formData.check_in_date}
                                    onChange={handleChange}
                                    min={today}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">Synced with departure date</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Calendar className="inline h-4 w-4 mr-1" />
                                    Check-out Date
                                </label>
                                <input
                                    type="date"
                                    name="check_out_date"
                                    value={formData.check_out_date}
                                    onChange={handleChange}
                                    min={formData.check_in_date || today}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-1">Synced with return date</p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <SearchIcon className="h-5 w-5" />
                            Search Flights & Hotels
                        </button>
                    </div>

                    {/* Summary */}
                    {(formData.source_place && formData.destination_place) && (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-2">Trip Summary</h4>
                            <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                                <p>✈️ {formData.source_place} ({formData.source_airport.toUpperCase()}) → {formData.destination_place} ({formData.destination_airport.toUpperCase()})</p>
                                <p>📅 {formData.outbound_date} to {formData.return_date}</p>
                                <p>👥 {Number(formData.number_of_adults) + Number(formData.number_of_children)} passenger(s)</p>
                                <p>🎫 {travelClassOptions.find(o => o.value === formData.travel_class)?.label}</p>
                                <p>🏨 {hotelClassOptions.find(o => o.value === formData.hotel_class)?.label} Hotels</p>
                                <p>📊 Sorted by {hotelSortOptions.find(o => o.value === formData.hotel_sort_by)?.label}</p>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Search