const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.log("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

db.serialize(() => {

    // USERS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.log("Users table error:", err.message);
        } else {
            console.log("Users table ready");
        }
    });

    // TRIPS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            destination TEXT NOT NULL,
            price INTEGER NOT NULL,
            days INTEGER NOT NULL,
            description TEXT,
            image TEXT
        )
    `, (err) => {
        if (err) {
            console.log("Trips table error:", err.message);
        } else {
            console.log("Trips table ready");
        }
    });

    // BOOKINGS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            trip_id INTEGER,
            booking_date TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(trip_id) REFERENCES trips(id)
        )
    `, (err) => {
        if (err) {
            console.log("Bookings table error:", err.message);
        } else {
            console.log("Bookings table ready");
        }
    });

});

module.exports = db;