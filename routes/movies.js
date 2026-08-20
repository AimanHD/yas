const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', async (_req, res) => {
  try { res.json(await db.getAll('movies', 'id', 'asc')) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', async (req, res) => {
  try {
    const { title, drive_url, description = '' } = req.body;
    if (!title || !drive_url) return res.status(400).json({ error: 'title and drive_url required' });
    res.json(await db.insert('movies', { title, drive_url, description }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, drive_url, description } = req.body;
    await db.update('movies', req.params.id, { title, drive_url, description });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try { await db.remove('movies', req.params.id); res.json({ ok: true }) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
