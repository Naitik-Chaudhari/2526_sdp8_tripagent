import { createContext, useContext, useState } from 'react'

const TripContext = createContext()

export function TripProvider({ children }) {
  const [tripData, setTripData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateTripData = (data) => {
    setTripData(data)
  }

  return (
    <TripContext.Provider
      value={{
        tripData,
        updateTripData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export const useTripContext = () => useContext(TripContext)
