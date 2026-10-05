const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

// settings es un mapa clave→valor (objeto en JSON, tabla key/value en Postgres)
router.get('/', async (_req, res) => {
  try { res.json(await db.getAllSettings()) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:key', async (req, res) => {
  try {
    await db.setSetting(req.params.key, req.body.value ?? '');
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
