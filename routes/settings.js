const express = require('express');
const { db }  = require('../database');
const router  = express.Router();

router.get('/', (_req, res) => res.json(db.getAllSettings()));

router.put('/:key', (req, res) => {
  const { value } = req.body;
  db.setSetting(req.params.key, value);
  res.json({ ok: true });
});

module.exports = router;
