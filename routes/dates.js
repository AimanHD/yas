const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', async (_req, res) => {
  try { res.json(await db.getAll('dates', 'date', 'asc')) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', async (req, res) => {
  try {
    const { title, date, description='', icon='', recurring=1 } = req.body;
    if (!title || !date) return res.status(400).json({ error: 'title and date required' });
    res.json(await db.insert('dates', { title, date, description, icon, recurring: recurring ? 1 : 0 }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, date, description, icon, recurring } = req.body;
    await db.update('dates', req.params.id, { title, date, description, icon, recurring: recurring ? 1 : 0 });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try { await db.remove('dates', req.params.id); res.json({ ok: true }) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
