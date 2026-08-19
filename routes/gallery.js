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
  }
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.get('/', (_req, res) => res.json(db.getAll('gallery', 'created_at', 'desc')));

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'image required' });
  const row = db.insert('gallery', {
    filename:    req.file.filename,
    title:       req.body.title || '',
    description: req.body.description || ''
  });
  res.json(row);
});

router.put('/:id', (req, res) => {
  const { title, description } = req.body;
  db.update('gallery', req.params.id, { title, description });
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  const row = db.getOne('gallery', req.params.id);
  if (row?.filename) {
    try { fs.unlinkSync(path.join(__dirname, '..', 'uploads', row.filename)) } catch (_) {}
  }
  db.remove('gallery', req.params.id);
  res.json({ ok: true });
});

module.exports = router;
