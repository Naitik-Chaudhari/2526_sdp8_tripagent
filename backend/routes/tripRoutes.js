import express from "express";
import {
  saveTrip,
  getMyTrips,
  getTripById,
  getTripWithDetails,
  saveHotel,
  getHotelsForTrip,
  saveFlight,
  getFlightsForTrip,
} from "../controllers/tripController.js";
import { attachClerkUser } from "../middleware/protectRoute.js";

const router = express.Router();

// ============================================
// TRIP ROUTES (Read-Only History)
// ============================================

/** 🔒 Store Trip (Authenticated Users ONLY) */
router.post("/save", attachClerkUser, saveTrip);

/** 🔒 Get All My Trips (Authenticated Users ONLY) */
router.get("/my-trips", attachClerkUser, getMyTrips);

/** 🔒 Get Single Trip by ID */
router.get("/:id", attachClerkUser, getTripById);

/** 🔒 Get Trip with Hotels and Flights */
router.get("/:id/details", attachClerkUser, getTripWithDetails);

// ============================================
// HOTEL ROUTES (Save & View Only)
// ============================================

/** 🔒 Save Hotel for a Trip */
router.post("/:tripId/hotels", attachClerkUser, saveHotel);

/** 🔒 Get Hotels for a Trip */
router.get("/:tripId/hotels", attachClerkUser, getHotelsForTrip);

// ============================================
// FLIGHT ROUTES (Save & View Only)
// ============================================

/** 🔒 Save Flight for a Trip */
router.post("/:tripId/flights", attachClerkUser, saveFlight);

/** 🔒 Get Flights for a Trip */
router.get("/:tripId/flights", attachClerkUser, getFlightsForTrip);

export default router;
