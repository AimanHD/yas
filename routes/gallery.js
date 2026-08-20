const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { db }  = require('../database');
const router  = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename:    (_req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, safe);
  },
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.get('/', async (_req, res) => {
  try { res.json(await db.getAll('gallery', 'created_at', 'desc')) }
  catch(e) { res.status(500).json({ error: e.message }) }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'image required' });
    res.json(await db.insert('gallery', {
      filename:    req.file.filename,
      title:       req.body.title || '',
      description: req.body.description || '',
    }));
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    await db.update('gallery', req.params.id, { title, description });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

router.delete('/:id', async (req, res) => {
  try {
    const row = await db.getOne('gallery', req.params.id);
    if (row?.filename) {
      try { fs.unlinkSync(path.join(__dirname, '..', 'uploads', row.filename)) } catch(_) {}
    }
    await db.remove('gallery', req.params.id);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: e.message }) }
});

module.exports = router;
