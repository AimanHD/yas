const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', (_req, res) =>
  res.json(db.getAll('notes', 'date', 'desc')));

router.post('/', (req, res) => {
  const { date, title = '', content, mood = '🥰' } = req.body;
  if (!content) return res.status(400).json({ error: 'content required' });
  const row = db.insert('notes', {
    date: date || new Date().toISOString().split('T')[0],
    title, content, mood
  });
  res.json(row);
});

router.put('/:id', (req, res) => {
  const { title, content, mood } = req.body;
  db.update('notes', req.params.id, { title, content, mood });
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  db.remove('notes', req.params.id);
  res.json({ ok: true });
});

module.exports = router;
