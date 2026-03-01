import * as models from "../database/models.js";

// ============================================
// TRIP CONTROLLERS
// ============================================

/**
 * 🔒 Save Trip (Authenticated User)
 */
export const saveTrip = async (req, res) => {
  try {
    console.log("🔥 SAVE TRIP CONTROLLER HIT");
    console.log("Clerk ID:", req.clerkId);

    const clerkId = req.clerkId;
    const tripData = req.body;

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing Clerk ID",
      });
    }

    // Validate required fields
    if (
      !tripData.destination_place ||
      !tripData.start_date ||
      !tripData.end_date
    ) {
      return res.status(400).json({
        success: false,
        message: "destination_place, start_date, and end_date are required",
      });
    }

    const trip = await models.createTrip(clerkId, tripData);

    res.status(201).json({
      success: true,
      message: "Trip saved successfully",
      trip,
    });
  } catch (error) {
    console.error("Save Trip Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving trip",
      error: error.message,
    });
  }
};

/**
 * 🔒 Get All Trips of Logged-in User
 */
export const getMyTrips = async (req, res) => {
  try {
    const clerkId = req.clerkId;

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const trips = await models.getTripsByClerkId(clerkId);

    res.status(200).json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error("Get Trips Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching trips",
    });
  }
};

/**
 * 🔒 Get Single Trip by ID (User-specific)
 */
export const getTripById = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { id } = req.params;

    const trip = await models.getTripById(id, clerkId);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error("Get Trip By ID Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * 🔒 Get Trip with Hotels and Flights
 */
export const getTripWithDetails = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { id } = req.params;

    const tripDetails = await models.getTripWithDetails(id, clerkId);

    if (!tripDetails) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tripDetails,
    });
  } catch (error) {
    console.error("Get Trip Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================================
// HOTEL CONTROLLERS
// ============================================

/**
 * 🔒 Save Hotel for a Trip
 */
export const saveHotel = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { tripId } = req.params;
    const hotelData = req.body;

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const hotel = await models.createHotel(clerkId, tripId, hotelData);

    res.status(201).json({
      success: true,
      message: "Hotel saved successfully",
      hotel,
    });
  } catch (error) {
    console.error("Save Hotel Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while saving hotel",
    });
  }
};

/**
 * 🔒 Get Hotels for a Trip
 */
export const getHotelsForTrip = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { tripId } = req.params;

    const hotels = await models.getHotelsByTripId(tripId, clerkId);

    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    console.error("Get Hotels Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching hotels",
    });
  }
};

// ============================================
// FLIGHT CONTROLLERS
// ============================================

/**
 * 🔒 Save Flight for a Trip
 */
export const saveFlight = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { tripId } = req.params;
    const flightData = req.body;

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const flight = await models.createFlight(clerkId, tripId, flightData);

    res.status(201).json({
      success: true,
      message: "Flight saved successfully",
      flight,
    });
  } catch (error) {
    console.error("Save Flight Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while saving flight",
    });
  }
};

/**
 * 🔒 Get Flights for a Trip
 */
export const getFlightsForTrip = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const { tripId } = req.params;

    const flights = await models.getFlightsByTripId(tripId, clerkId);

    res.status(200).json({
      success: true,
      flights,
    });
  } catch (error) {
    console.error("Get Flights Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching flights",
    });
  }
};
