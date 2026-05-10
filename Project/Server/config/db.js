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
            password TEXT NOT NULL,
            profile_photo TEXT,
            preferences TEXT
        )
    `, (err) => {
        if (err) console.log("Users table error:", err.message);
        else console.log("Users table ready");
    });

    // TRIPS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            start_date TEXT,
            end_date TEXT,
            cover_photo TEXT,
            is_public INTEGER DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.log("Trips table error:", err.message);
        else console.log("Trips table ready");
    });

    // STOPS (CITIES) TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS stops (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            trip_id INTEGER NOT NULL,
            city_name TEXT NOT NULL,
            country TEXT,
            arrival_date TEXT,
            departure_date TEXT,
            order_index INTEGER,
            FOREIGN KEY(trip_id) REFERENCES trips(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.log("Stops table error:", err.message);
        else console.log("Stops table ready");
    });

    // ACTIVITIES TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stop_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            type TEXT,
            cost REAL DEFAULT 0,
            duration TEXT,
            time_scheduled TEXT,
            FOREIGN KEY(stop_id) REFERENCES stops(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.log("Activities table error:", err.message);
        else console.log("Activities table ready");
    });

});

module.exports = db;