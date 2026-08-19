const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', (_req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const rows  = db.getAll('capsules', 'open_date', 'asc');
  // auto-open if date passed
  rows.forEach(r => {
    if (!r.opened && r.open_date <= today) {
      db.update('capsules', r.id, { opened: 1 });
      r.opened = 1;
    }
  });
  res.json(rows);
});

router.post('/', (req, res) => {
  const { title, content, open_date } = req.body;
  if (!title || !content || !open_date)
    return res.status(400).json({ error: 'title, content and open_date required' });
  res.json(db.insert('capsules', { title, content, open_date, opened: 0 }));
});

router.delete('/:id', (req, res) => {
  db.remove('capsules', req.params.id);
  res.json({ ok: true });
});

module.exports = router;
