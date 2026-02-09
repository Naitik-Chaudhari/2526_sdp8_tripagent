import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search as SearchIcon,
  Plane,
  Users,
  Calendar,
  Star
} from 'lucide-react'
import { useTripContext } from '../context/TripContext'

/* -------------------- MAPPINGS -------------------- */
const TRAVEL_CLASS_MAP = {
  economy: 1,
  premium_economy: 2,
  business: 3,
  first: 4,
}

const HOTEL_SORT_MAP = {
  popularity: 8,
  price_low: 1,
  price_high: 2,
  rating: 3,
  stars: 4,
  distance: 5,
}

const FLIGHT_SORT_MAP = {
  best: 1,
  cheapest: 2,
  fastest: 3,
}

const API_URL = 'http://127.0.0.1:8000/plan-trip'

function Search() {
  const navigate = useNavigate()
  const { updateTripData, setIsLoading } = useTripContext()

  const [formData, setFormData] = useState({
    source_place: '',
    source_airport: '',
    destination_place: '',
    destination_airport: '',
    outbound_date: '',
    return_date: '',

    travel_class: 'economy',
    flight_sort_by: 'best',

    number_of_adults: 1,
    number_of_children: 0,

    check_in_date: '',
    check_out_date: '',
    hotel_sort_by: 'popularity',

    preferences: '',
  })

  const today = new Date().toISOString().split('T')[0]

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    if (formData.outbound_date && !formData.check_in_date) {
      setFormData(p => ({ ...p, check_in_date: formData.outbound_date }))
    }
    if (formData.return_date && !formData.check_out_date) {
      setFormData(p => ({ ...p, check_out_date: formData.return_date }))
    }
  }, [formData.outbound_date, formData.return_date])

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const preferencesArray = formData.preferences
      .split(',')
      .map(p => p.trim())
      .filter(Boolean)

    const requestBody = {
      source_place: formData.source_place,
      source_airport: formData.source_airport.toUpperCase(),
      destination_place: formData.destination_place,
      destination_airport: formData.destination_airport.toUpperCase(),

      outbound_date: formData.outbound_date,
      return_date: formData.return_date,

      travel_class: TRAVEL_CLASS_MAP[formData.travel_class],
      flight_sort_by: FLIGHT_SORT_MAP[formData.flight_sort_by],

      num_adults: Number(formData.number_of_adults),
      num_children: Number(formData.number_of_children),

      check_in_date: formData.check_in_date,
      check_out_date: formData.check_out_date,

      hotel_sort_by: HOTEL_SORT_MAP[formData.hotel_sort_by],
      preferences: preferencesArray,
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!res.ok) throw new Error('API Error')

      const data = await res.json()
      updateTripData(data)
      navigate('/results')
    } catch (err) {
      console.error(err)
      alert('Failed to generate trip plan')
    } finally {
      setIsLoading(false)
    }
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <SearchIcon /> Plan Your Trip
        </h2>
        <p className="text-blue-100">
          Enter details to generate a complete travel itinerary
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">

        {/* Flight Details */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
            <Plane className="text-blue-600" /> Flight Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input name="source_place" placeholder="Source City (Ahmedabad)" onChange={handleChange} className="input" />
            <input name="source_airport" placeholder="Source Airport (AMD)" maxLength={3} onChange={handleChange} className="input uppercase" />
            <input name="destination_place" placeholder="Destination City (Jaipur)" onChange={handleChange} className="input" />
            <input name="destination_airport" placeholder="Destination Airport (JAI)" maxLength={3} onChange={handleChange} className="input uppercase" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input type="date" name="outbound_date" min={today} onChange={handleChange} className="input" />
            <input type="date" name="return_date" min={formData.outbound_date || today} onChange={handleChange} className="input" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <select name="travel_class" value={formData.travel_class} onChange={handleChange} className="input">
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>

            <select name="flight_sort_by" value={formData.flight_sort_by} onChange={handleChange} className="input">
              <option value="best">Best Flights</option>
              <option value="cheapest">Cheapest</option>
              <option value="fastest">Fastest</option>
            </select>
          </div>
        </section>

        {/* Passengers */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
            <Users className="text-blue-600" /> Passengers
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input type="number" min="1" name="number_of_adults" value={formData.number_of_adults} onChange={handleChange} className="input" />
            <input type="number" min="0" name="number_of_children" value={formData.number_of_children} onChange={handleChange} className="input" />
          </div>
        </section>

        {/* Hotel Stay */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
            <Calendar className="text-blue-600" /> Hotel Stay
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input type="date" name="check_in_date" value={formData.check_in_date} min={today} onChange={handleChange} className="input" />
            <input type="date" name="check_out_date" value={formData.check_out_date} min={formData.check_in_date || today} onChange={handleChange} className="input" />
          </div>

          <select name="hotel_sort_by" value={formData.hotel_sort_by} onChange={handleChange} className="input">
            <option value="popularity">Popularity</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Guest Rating</option>
            <option value="stars">Star Rating</option>
            <option value="distance">Distance</option>
          </select>
        </section>

        {/* Preferences */}
        <section className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
            <Star className="text-blue-600" /> Travel Preferences
          </h3>

          <textarea
            name="preferences"
            rows={3}
            value={formData.preferences}
            onChange={handleChange}
            placeholder="historical sites, forts, museums"
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </section>

        {/* Submit */}
        <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Generate Trip Plan
        </button>
      </form>
    </div>
  )
}

export default Search
