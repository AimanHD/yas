const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', async (_req, res) => {
  try { res.json(await db.getAll('settings', 'key', 'asc')) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:key', async (req, res) => {
  try {
    const { value } = req.body;
    const existing = (await db.getAll('settings', 'key', 'asc')).find(r => r.key === req.params.key);
    if (existing) {
      await db.update('settings', existing.id, { value });
    } else {
      await db.insert('settings', { key: req.params.key, value });
    }
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
