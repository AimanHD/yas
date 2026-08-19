const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', (req, res) => {
  const all = db.getAll('poems', 'created_at', 'desc');
  const { type } = req.query;
  res.json(type ? all.filter(p => p.type === type) : all);
});

router.post('/', (req, res) => {
  const { title, content, type = 'poem' } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'title and content required' });
  res.json(db.insert('poems', { title, content, type }));
});

router.put('/:id', (req, res) => {
  const { title, content, type } = req.body;
  db.update('poems', req.params.id, { title, content, type });
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  db.remove('poems', req.params.id);
  res.json({ ok: true });
});

module.exports = router;
