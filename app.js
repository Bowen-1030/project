const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');
const loginRoutes = require('./routes/login.js');
const registerRoutes = require('./routes/register');
const adminHandlerRoutes = require('./adminHandler');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(__dirname));

// Routes
app.use('/admin', adminHandlerRoutes);
app.use('/', loginRoutes);
app.use('/', registerRoutes);

// Handle root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname,'admin.html'));
  });

  // Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
      } else {
          res.redirect('/');
      }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});