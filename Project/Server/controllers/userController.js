const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "traveloop_secret_key";

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
            if (row) return res.status(400).json({ message: "User already exists" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            db.run(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, hashedPassword],
                function(err) {
                    if (err) return res.status(500).json({ message: "Database error" });
                    
                    const token = jwt.sign({ id: this.lastID }, JWT_SECRET, { expiresIn: "7d" });
                    res.json({ token, user: { id: this.lastID, name, email } });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
};

exports.getUserProfile = (req, res) => {
    db.get("SELECT id, name, email, profile_photo, preferences FROM users WHERE id = ?", [req.user.id], (err, user) => {
        if (err) return res.status(500).json({ message: "Database error" });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    });
};