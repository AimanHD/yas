const express = require('express');
const path    = require('path');
const cors    = require('cors');
const fs      = require('fs');
const { seed } = require('./database');

const app  = express();
const PORT = process.env.PORT || 3000;

// Ensure upload directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/love',    express.static(path.join(__dirname, 'love')));
app.use('/uploads', express.static(uploadsDir));
app.use('/experience', express.static(__dirname, {
  index: false,
  extensions: ['html']
}));

// Serve specific experience files
app.get('/experience/espejo',    (_req, res) => res.sendFile(path.join(__dirname, 'espejo.html')));
app.get('/experience/linterna',  (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/experience/estrellas', (_req, res) => res.sendFile(path.join(__dirname, 'noche.html')));
app.get('/experience/globos',    (_req, res) => res.sendFile(path.join(__dirname, 'globos.html')));
app.get('/experience/libro',     (_req, res) => res.sendFile(path.join(__dirname, 'libro.html')));

// API routes
app.use('/api/letters',  require('./routes/letters'));
app.use('/api/notes',    require('./routes/notes'));
app.use('/api/poems',    require('./routes/poems'));
app.use('/api/gallery',  require('./routes/gallery'));
app.use('/api/capsules', require('./routes/capsules'));
app.use('/api/dates',    require('./routes/dates'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/movies',   require('./routes/movies'));

// SPA fallback
app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html')));

seed().then(() => {
  app.listen(PORT, () => {
    console.log('');
    console.log('  ♥ ♥ ♥  Yasmin App  ♥ ♥ ♥');
    console.log(`  → http://localhost:${PORT}`);
    console.log('');
  });
}).catch(err => { console.error('Seed failed:', err); process.exit(1); });
