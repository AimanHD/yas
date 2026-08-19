const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', (_req, res) => res.json(db.getAll('dates', 'date', 'asc')));

router.post('/', (req, res) => {
  const { title, date, description = '', icon = '💕', recurring = 1 } = req.body;
  if (!title || !date) return res.status(400).json({ error: 'title and date required' });
  res.json(db.insert('dates', { title, date, description, icon, recurring: recurring ? 1 : 0 }));
});

router.put('/:id', (req, res) => {
  const { title, date, description, icon, recurring } = req.body;
  db.update('dates', req.params.id, { title, date, description, icon, recurring: recurring ? 1 : 0 });
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  db.remove('dates', req.params.id);
  res.json({ ok: true });
});

module.exports = router;
