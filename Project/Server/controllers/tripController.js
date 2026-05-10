const db = require("../config/db");

// Get all trips for the logged-in user
exports.getTrips = (req, res) => {
    db.all("SELECT * FROM trips WHERE user_id = ?", [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ message: "Database error" });
        res.json(rows);
    });
};

// Get a specific trip by ID
exports.getTripById = (req, res) => {
    db.get("SELECT * FROM trips WHERE id = ? AND user_id = ?", [req.params.id, req.user.id], (err, trip) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!trip) return res.status(404).json({ message: "Trip not found" });
        
        // Fetch stops for this trip
        db.all("SELECT * FROM stops WHERE trip_id = ? ORDER BY order_index", [trip.id], (err, stops) => {
            if (err) return res.status(500).json({ message: "Database error" });
            trip.stops = stops;
            res.json(trip);
        });
    });
};

// Create a new trip
exports.createTrip = (req, res) => {
    const { name, description, start_date, end_date, cover_photo } = req.body;
    
    db.run(
        "INSERT INTO trips (user_id, name, description, start_date, end_date, cover_photo) VALUES (?, ?, ?, ?, ?, ?)",
        [req.user.id, name, description, start_date, end_date, cover_photo],
        function(err) {
            if (err) return res.status(500).json({ message: "Database error" });
            res.json({ message: "Trip created successfully", tripId: this.lastID });
        }
    );
};

// Get general recommendations (Public)
exports.getRecommendations = (req, res) => {
    res.json({
        recommended: [
            "Kyoto, Japan",
            "Bali, Indonesia",
            "Rome, Italy",
            "Cape Town, South Africa"
        ]
    });
};
