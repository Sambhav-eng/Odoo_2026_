const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getTrips, getTripById, createTrip, getRecommendations } = require("../controllers/tripController");

// Public route
router.get("/recommendations", getRecommendations);

// Protected routes
router.get("/trips", auth, getTrips);
router.get("/trips/:id", auth, getTripById);
router.post("/trips", auth, createTrip);

module.exports = router;
