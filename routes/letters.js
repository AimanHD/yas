const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', (_req, res) => res.json(db.getAll('letters', 'id', 'asc')));

router.get('/:id', (req, res) => {
  const row = db.getOne('letters', req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { title, subtitle = '', content, filename, type = 'letter' } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const row = db.insert('letters', { title, subtitle, content, filename, type });
  res.json(row);
});

router.put('/:id', (req, res) => {
  const { title, subtitle, content, type } = req.body;
  db.update('letters', req.params.id, { title, subtitle, content, type });
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  db.remove('letters', req.params.id);
  res.json({ ok: true });
});

module.exports = router;
