import { createContext, useContext, useState } from 'react'

const TripContext = createContext(null)

export function TripProvider({ children }) {
    const [tripData, setTripData] = useState({
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

    const [searchResults, setSearchResults] = useState({
        flights: [],
        hotels: [],
        weather: null,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateTripData = (data) => {
        setTripData((prev) => ({ ...prev, ...data }))
    }

    const resetTripData = () => {
        setTripData({
            source_place: '',
            source_airport: '',
            destination_place: '',
            destination_airport: '',
            outbound_date: '',
            return_date: '',
            trip_duration_days: '',
            travel_class: 'economy',
            number_of_adults: 1,
            number_of_children: 0,
            hotel_sort_by: 'popularity',
            hotel_class: '3',
            check_in_date: '',
            check_out_date: '',
        })
        setSearchResults({ flights: [], hotels: [], weather: null })
        setError(null)
    }

    return (
        <TripContext.Provider
            value={{
                tripData,
                updateTripData,
                resetTripData,
                searchResults,
                setSearchResults,
                isLoading,
                setIsLoading,
                error,
                setError,
            }}
        >
            {children}
        </TripContext.Provider>
    )
}

export function useTripContext() {
    const context = useContext(TripContext)
    if (!context) {
        throw new Error('useTripContext must be used within a TripProvider')
    }
    return context
}

export default TripContext