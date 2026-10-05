const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

// Postgres devuelve DATE como objeto Date; JSON como texto. Normalizamos a YYYY-MM-DD.
const ymd = d => (d instanceof Date ? d.toISOString() : String(d || '')).slice(0, 10);

router.get('/', async (_req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const rows  = await db.getAll('capsules', 'open_date', 'asc');
    const out = [];
    for (const r of rows) {
      const open_date = ymd(r.open_date);
      const isOpen = open_date <= today;
      if (isOpen && !r.opened) await db.update('capsules', r.id, { opened: true });
      // el contenido de una cápsula cerrada no sale del servidor hasta su fecha
      out.push({ ...r, open_date, opened: isOpen, content: isOpen ? r.content : '' });
    }
    res.json(out);
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, open_date } = req.body;
    if (!title || !content || !open_date)
      return res.status(400).json({ error: 'title, content and open_date required' });
    res.json(await db.insert('capsules', { title, content, open_date, opened: false }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try { await db.remove('capsules', req.params.id); res.json({ ok: true }) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
