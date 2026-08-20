const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', async (_req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const rows  = await db.getAll('capsules', 'open_date', 'asc');
    for (const r of rows) {
      if (!r.opened && r.open_date <= today) {
        await db.update('capsules', r.id, { opened: 1 });
        r.opened = 1;
      }
    }
    res.json(rows);
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, open_date } = req.body;
    if (!title || !content || !open_date)
      return res.status(400).json({ error: 'title, content and open_date required' });
    res.json(await db.insert('capsules', { title, content, open_date, opened: 0 }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try { await db.remove('capsules', req.params.id); res.json({ ok: true }) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
