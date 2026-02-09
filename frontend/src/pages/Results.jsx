import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plane,
  Hotel,
  Calendar,
  Sun,
  MapPin
} from 'lucide-react'
import { useTripContext } from '../context/TripContext'

function Results() {
  const navigate = useNavigate()
  const { tripData, isLoading } = useTripContext()

  useEffect(() => {
    if (!tripData && !isLoading) {
      navigate('/')
    }
  }, [tripData, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Generating your trip plan...
      </div>
    )
  }

  if (!tripData) return null

  const { itinerary, references } = tripData
  const { best_flight, best_hotel, daily_itinerary } = itinerary
  const weather = references?.weather

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* ---------------- Header ---------------- */}
      <h1 className="text-3xl font-bold text-center">
        Your Trip Itinerary ✨
      </h1>

      {/* ---------------- Best Flight & Hotel ---------------- */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Best Flight */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
            <Plane className="text-blue-600" /> Best Flight
          </h2>
          <p className="font-medium">{best_flight.airline}</p>
          <p className="text-gray-600">
            Flight No: {best_flight.flight_numbers.join(', ')}
          </p>
        </div>

        {/* Best Hotel */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
            <Hotel className="text-blue-600" /> Best Hotel
          </h2>
          <p className="font-medium">{best_hotel.name}</p>
        </div>
      </div>

      {/* ---------------- Weather Summary ---------------- */}
      {weather && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Sun className="text-yellow-500" /> Weather Overview
          </h2>
          <p className="font-medium">{weather.location}</p>
          <p className="text-gray-700">{weather.overall_summary}</p>
          <p className="text-sm text-gray-600 mt-1">
            {weather.travel_advice}
          </p>
        </div>
      )}

      {/* ---------------- Day-wise Itinerary ---------------- */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="text-blue-600" /> Day-wise Plan
        </h2>

        {daily_itinerary.map((day, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {day.date}
              </h3>
              <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                {day.weather}
              </span>
            </div>

            <div className="space-y-4">
              {day.schedule.map((item, i) => (
                <div
                  key={i}
                  className="border-l-4 border-blue-500 pl-4"
                >
                  <p className="text-sm font-semibold text-blue-600">
                    {item.time}
                  </p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {item.place}
                  </p>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                  <p className="text-sm text-green-700">
                    ⭐ {item.must_enjoy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Results
