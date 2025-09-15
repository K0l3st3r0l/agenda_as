const express = require('express');
const router = express.Router();
const db = require('../services/db-service');

// GET all jobs
router.get('/', (req, res) => {
  db.all('SELECT * FROM jobs', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET job by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(row);
  });
});

// POST create job
router.post('/', (req, res) => {
  const { client_id, car_id, description, scheduled_date, status } = req.body;
  if (!client_id || !car_id || !description || !scheduled_date) {
    return res.status(400).json({ error: 'Client ID, car ID, description, and scheduled date are required' });
  }
  db.run('INSERT INTO jobs (client_id, car_id, description, scheduled_date, status) VALUES (?, ?, ?, ?, ?)', [client_id, car_id, description, scheduled_date, status || 'pending'], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, client_id, car_id, description, scheduled_date, status: status || 'pending' });
  });
});

// PUT update job
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { client_id, car_id, description, scheduled_date, status } = req.body;
  db.run('UPDATE jobs SET client_id = ?, car_id = ?, description = ?, scheduled_date = ?, status = ? WHERE id = ?', [client_id, car_id, description, scheduled_date, status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ id, client_id, car_id, description, scheduled_date, status });
  });
});

// DELETE job
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM jobs WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  });
});

module.exports = router;