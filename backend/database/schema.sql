-- ============================================
-- Trip Management Database Schema
-- Read-Only Trip History (No Updates/Deletes)
-- ============================================

-- Main trips table
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id VARCHAR(255) NOT NULL,

    destination_place VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    trip_duration_days INT NOT NULL,
    arrival_day_zone VARCHAR(100),

    zones JSONB,               -- full zones array
    day_zone_strategy JSONB,   -- mapping of day → zone
    itinerary JSONB,           -- FULL itinerary JSON
    references_data JSONB,     -- weather + places JSON

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Data validation constraints
    CONSTRAINT check_trip_dates CHECK (start_date <= end_date),
    CONSTRAINT check_duration CHECK (trip_duration_days > 0)
);

-- Hotels table
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL,
    clerk_id VARCHAR(255) NOT NULL,

    destination_place VARCHAR(255),
    checkin_date DATE NOT NULL,
    checkout_date DATE NOT NULL,
    num_adults INT NOT NULL DEFAULT 1,
    num_children INT NOT NULL DEFAULT 0,
    hotel_sort_by INT,

    hotel_results JSONB,  -- FULL hotel JSON (search_links + hotels + recommended)

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_trip
        FOREIGN KEY(trip_id)
        REFERENCES trips(id)
        ON DELETE CASCADE,

    -- Data validation constraints
    CONSTRAINT check_hotel_dates CHECK (checkin_date < checkout_date),
    CONSTRAINT check_adults CHECK (num_adults > 0),
    CONSTRAINT check_children CHECK (num_children >= 0)
);

-- Flights table
CREATE TABLE flights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL,
    clerk_id VARCHAR(255) NOT NULL,

    source_place VARCHAR(255),
    source_airport VARCHAR(50),
    destination_place VARCHAR(255),
    destination_airport VARCHAR(50),

    start_date DATE NOT NULL,
    return_date DATE,
    num_adults INT NOT NULL DEFAULT 1,
    num_children INT NOT NULL DEFAULT 0,
    travel_class INT,
    flight_sort_by INT,

    flight_results JSONB,  -- FULL flight JSON

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_trip_flight
        FOREIGN KEY(trip_id)
        REFERENCES trips(id)
        ON DELETE CASCADE,

    -- Data validation constraints
    CONSTRAINT check_flight_dates CHECK (return_date IS NULL OR start_date <= return_date),
    CONSTRAINT check_flight_adults CHECK (num_adults > 0),
    CONSTRAINT check_flight_children CHECK (num_children >= 0)
);

-- ============================================
-- INDEXES for Performance
-- ============================================

-- Trips indexes
CREATE INDEX idx_trips_clerk_id ON trips(clerk_id);
CREATE INDEX idx_trips_dates ON trips(start_date, end_date);
CREATE INDEX idx_trips_destination ON trips(destination_place);

-- Hotels indexes
CREATE INDEX idx_hotels_clerk_id ON hotels(clerk_id);
CREATE INDEX idx_hotels_trip_id ON hotels(trip_id);
CREATE INDEX idx_hotels_clerk_trip ON hotels(clerk_id, trip_id);

-- Flights indexes
CREATE INDEX idx_flights_clerk_id ON flights(clerk_id);
CREATE INDEX idx_flights_trip_id ON flights(trip_id);
CREATE INDEX idx_flights_clerk_trip ON flights(clerk_id, trip_id);
