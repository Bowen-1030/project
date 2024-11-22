// routes/register.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'service_manager'
});


router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validate that all required fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // SQL query to insert a new user
    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, password, 'user'], (err, result) => {
        if (err) {
            console.error('Error inserting user into database:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
    });
});

module.exports = router;
