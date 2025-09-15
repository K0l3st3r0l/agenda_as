const express = require('express');
const router = express.Router();
const db = require('../services/db-service');

// GET all clients
router.get('/', (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET client by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM clients WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(row);
  });
});

// POST create client
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  db.run('INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name, email, phone });
  });
});

// PUT update client
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  db.run('UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ id, name, email, phone });
  });
});

// DELETE client
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM clients WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ message: 'Client deleted' });
  });
});

module.exports = router;