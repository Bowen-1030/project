// routes/login.js
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



router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ success: false, message: 'Database error' });
        } else if (results.length > 0) {
            // User found, check role
            const user = results[0];
            req.session.user = { username: user.username, role: user.role };
            res.json({ success: true, role: user.role });
        } else {
            // User not found or incorrect credentials
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
