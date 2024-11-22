const express = require('express');
const db = require('./db');

const router = express.Router();

// Get All Services
router.get('/getServices', (req, res) => {
  const sql = 'SELECT * FROM services';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Failed to retrieve services');
    } else {
      res.status(200).json(results);
    }
  });
});

// Edit Business Information
router.post('/editBusiness', (req, res) => {
  const { logo, address } = req.body;
  const sql = 'UPDATE business_info SET logo = ?, address = ? WHERE id = 1';
  db.query(sql, [ logo, address], (err) => {
    if (err) {
      res.status(500).send('Failed to update business information');
    } else {
      res.status(200).send('Business information updated successfully');
    }
  });
});

// Add a New Service
router.post('/addService', (req, res) => {
  const { name, description, price } = req.body;
  const sql = 'INSERT INTO services (name, description, price) VALUES (?, ?, ?)';
  db.query(sql, [name, description, price], (err) => {
    if (err) {
      res.status(500).send('Failed to add service');
    } else {
      res.status(200).send('Service added successfully');
    }
  });
});

// Edit an Existing Service
router.post('/editService', (req, res) => {
  const { id, name, description, price } = req.body;
  const sql = 'UPDATE services SET name = ?, description = ?, price = ? WHERE id = ?';
  db.query(sql, [name, description, price, id], (err) => {
    if (err) {
      res.status(500).send('Failed to update service');
    } else {
      res.status(200).send('Service updated successfully');
    }
  });
});

// Delete a Service
router.post('/deleteService', (req, res) => {
  const { id } = req.body;
  const sql = 'DELETE FROM services WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).send('Failed to delete service');
    } else {
      res.status(200).send('Service deleted successfully');
    }
  });
});


module.exports = router;