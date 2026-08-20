const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', async (_req, res) => {
  try { res.json(await db.getAll('notes', 'date', 'desc')) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', async (req, res) => {
  try {
    const { date, title='', content, mood='🥰' } = req.body;
    if (!content) return res.status(400).json({ error: 'content required' });
    res.json(await db.insert('notes', {
      date: date || new Date().toISOString().split('T')[0],
      title, content, mood,
    }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:id', async (req, res) => {
  try {
    const { date, title, content, mood } = req.body;
    await db.update('notes', req.params.id, { date, title, content, mood });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try { await db.remove('notes', req.params.id); res.json({ ok: true }) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
