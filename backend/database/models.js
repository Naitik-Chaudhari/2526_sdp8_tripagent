import { pool } from "./db.js";

// ============================================
// TRIP MODELS
// ============================================

/**
 * Create a new trip
 */
export const createTrip = async (clerkId, tripData) => {
  const {
    destination_place,
    start_date,
    end_date,
    trip_duration_days,
    arrival_day_zone,
    zones,
    day_zone_strategy,
    itinerary,
    references,
  } = tripData;

  const query = `
    INSERT INTO trips (
      clerk_id,
      destination_place,
      start_date,
      end_date,
      trip_duration_days,
      arrival_day_zone,
      zones,
      day_zone_strategy,
      itinerary,
      references_data
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;

  const values = [
    clerkId,
    destination_place,
    start_date,
    end_date,
    trip_duration_days,
    arrival_day_zone || null,
    JSON.stringify(zones || []),
    JSON.stringify(day_zone_strategy || {}),
    JSON.stringify(itinerary || {}),
    JSON.stringify(references || {}),
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Get all trips for a user
 */
export const getTripsByClerkId = async (clerkId) => {
  const query = `
    SELECT * FROM trips 
    WHERE clerk_id = $1 
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [clerkId]);
  return result.rows;
};

/**
 * Get single trip by ID (with security check)
 */
export const getTripById = async (tripId, clerkId) => {
  const query = `
    SELECT * FROM trips 
    WHERE id = $1 AND clerk_id = $2
  `;

  const result = await pool.query(query, [tripId, clerkId]);
  return result.rows[0] || null;
};

/**
 * Get trip with hotels and flights
 */
export const getTripWithDetails = async (tripId, clerkId) => {
  const query = `
    SELECT 
      t.*,
      COALESCE(
        json_agg(DISTINCT h.*) FILTER (WHERE h.id IS NOT NULL), 
        '[]'
      ) as hotels,
      COALESCE(
        json_agg(DISTINCT f.*) FILTER (WHERE f.id IS NOT NULL), 
        '[]'
      ) as flights
    FROM trips t
    LEFT JOIN hotels h ON h.trip_id = t.id
    LEFT JOIN flights f ON f.trip_id = t.id
    WHERE t.id = $1 AND t.clerk_id = $2
    GROUP BY t.id
  `;

  const result = await pool.query(query, [tripId, clerkId]);
  return result.rows[0] || null;
};

// ============================================
// HOTEL MODELS
// ============================================

/**
 * Create hotel record for a trip
 */
export const createHotel = async (clerkId, tripId, hotelData) => {
  const {
    destination_place,
    checkin_date,
    checkout_date,
    num_adults,
    num_children,
    hotel_sort_by,
    hotel_results,
  } = hotelData;

  // Verify trip belongs to user
  const tripCheck = await pool.query(
    "SELECT id FROM trips WHERE id = $1 AND clerk_id = $2",
    [tripId, clerkId],
  );

  if (tripCheck.rows.length === 0) {
    throw new Error("Trip not found or unauthorized");
  }

  const query = `
    INSERT INTO hotels (
      trip_id,
      clerk_id,
      destination_place,
      checkin_date,
      checkout_date,
      num_adults,
      num_children,
      hotel_sort_by,
      hotel_results
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    tripId,
    clerkId,
    destination_place,
    checkin_date,
    checkout_date,
    num_adults || 1,
    num_children || 0,
    hotel_sort_by || null,
    JSON.stringify(hotel_results || {}),
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Get hotels for a trip
 */
export const getHotelsByTripId = async (tripId, clerkId) => {
  const query = `
    SELECT h.* FROM hotels h
    INNER JOIN trips t ON t.id = h.trip_id
    WHERE h.trip_id = $1 AND t.clerk_id = $2
  `;

  const result = await pool.query(query, [tripId, clerkId]);
  return result.rows;
};

// ============================================
// FLIGHT MODELS
// ============================================

/**
 * Create flight record for a trip
 */
export const createFlight = async (clerkId, tripId, flightData) => {
  const {
    source_place,
    source_airport,
    destination_place,
    destination_airport,
    start_date,
    return_date,
    num_adults,
    num_children,
    travel_class,
    flight_sort_by,
    flight_results,
  } = flightData;

  // Verify trip belongs to user
  const tripCheck = await pool.query(
    "SELECT id FROM trips WHERE id = $1 AND clerk_id = $2",
    [tripId, clerkId],
  );

  if (tripCheck.rows.length === 0) {
    throw new Error("Trip not found or unauthorized");
  }

  const query = `
    INSERT INTO flights (
      trip_id,
      clerk_id,
      source_place,
      source_airport,
      destination_place,
      destination_airport,
      start_date,
      return_date,
      num_adults,
      num_children,
      travel_class,
      flight_sort_by,
      flight_results
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *
  `;

  const values = [
    tripId,
    clerkId,
    source_place,
    source_airport,
    destination_place,
    destination_airport,
    start_date,
    return_date || null,
    num_adults || 1,
    num_children || 0,
    travel_class || null,
    flight_sort_by || null,
    JSON.stringify(flight_results || {}),
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Get flights for a trip
 */
export const getFlightsByTripId = async (tripId, clerkId) => {
  const query = `
    SELECT f.* FROM flights f
    INNER JOIN trips t ON t.id = f.trip_id
    WHERE f.trip_id = $1 AND t.clerk_id = $2
  `;

  const result = await pool.query(query, [tripId, clerkId]);
  return result.rows;
};
