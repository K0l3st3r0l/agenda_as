const express = require('express');
const router = express.Router();
const db = require('../services/db-service');

// GET all cars
router.get('/', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET car by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM cars WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(row);
  });
});

// POST create car
router.post('/', (req, res) => {
  const { client_id, make, model, year, license_plate } = req.body;
  if (!client_id || !make || !model) {
    return res.status(400).json({ error: 'Client ID, make, and model are required' });
  }
  db.run('INSERT INTO cars (client_id, make, model, year, license_plate) VALUES (?, ?, ?, ?, ?)', [client_id, make, model, year, license_plate], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, client_id, make, model, year, license_plate });
  });
});

// PUT update car
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { client_id, make, model, year, license_plate } = req.body;
  db.run('UPDATE cars SET client_id = ?, make = ?, model = ?, year = ?, license_plate = ? WHERE id = ?', [client_id, make, model, year, license_plate, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ id, client_id, make, model, year, license_plate });
  });
});

// DELETE car
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM cars WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted' });
  });
});

module.exports = router;