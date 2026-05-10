const express = require("express");
const cors = require("cors");
const db = require("./config/db");


const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "TravelLoop Backend Running" });
});

const PORT = process.env.PORT || 5001;

const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");

app.use("/api/users", userRoutes);
app.use("/api", tripRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, (err) => {
        if (err) {
            console.error("Error starting server:", err);
        } else {
            console.log(`Server running on ${PORT}`);
        }
    });
}

module.exports = app;