const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', async (_req, res) => {
  try { res.json(await db.getAll('letters', 'id', 'asc')) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.get('/:id', async (req, res) => {
  try {
    const row = await db.getOne('letters', req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', async (req, res) => {
  try {
    const { title, subtitle='', content, filename, type='letter' } = req.body;
    if (!title) return res.status(400).json({ error: 'title required' });
    res.json(await db.insert('letters', { title, subtitle, content, filename, type }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, subtitle, content, type } = req.body;
    await db.update('letters', req.params.id, { title, subtitle, content, type });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try { await db.remove('letters', req.params.id); res.json({ ok: true }) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
