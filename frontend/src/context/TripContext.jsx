import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [discoverData, setDiscoverData] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [flightResults, setFlightResults] = useState(null);
  const [flightSearchData, setFlightSearchData] = useState(null);
  const [hotelSearchData, setHotelSearchData] = useState(null);
  const [hotelResults, setHotelResults] = useState(null);

  return (
    <TripContext.Provider
      value={{
        discoverData,
        setDiscoverData,
        tripPlan,
        setTripPlan,
        tripId,
        setTripId,
        flightSearchData,
        setFlightSearchData,
        flightResults,
        setFlightResults,
        hotelSearchData,
        setHotelSearchData,
        hotelResults,
        setHotelResults
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);