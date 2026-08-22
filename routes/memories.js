const express = require('express');
const multer  = require('multer');
const path    = require('path');
const { db }  = require('../database');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename:    (_req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, safe);
  },
});
const upload = multer({ storage, limits: { fileSize: 30 * 1024 * 1024 } });

router.get('/', async (_req, res) => {
  try { res.json(await db.getAll('memories', 'sort_order', 'asc')) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'photo required' });
    res.json(await db.insert('memories', {
      group_key:   'user-' + Date.now(),
      group_title: req.body.title || 'Mi recuerdo',
      group_sub:   req.body.date  || '',
      group_text:  req.body.text  || '',
      filename:    req.file.filename,
      sort_order:  9999,
      seeded:      false,
    }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.remove('memories', req.params.id);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
