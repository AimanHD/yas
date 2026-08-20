const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', async (req, res) => {
  try {
    const all = await db.getAll('poems', 'created_at', 'desc');
    const { type } = req.query;
    res.json(type ? all.filter(p => p.type === type) : all);
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, type='poem' } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content required' });
    res.json(await db.insert('poems', { title, content, type }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, content, type } = req.body;
    await db.update('poems', req.params.id, { title, content, type });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try { await db.remove('poems', req.params.id); res.json({ ok: true }) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
