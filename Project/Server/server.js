const express = require("express");
const cors = require("cors");
const db = require("./config/db");


const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = 5001;

app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server running on ${PORT}`);
    }
});

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);