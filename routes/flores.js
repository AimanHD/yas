const express = require('express');
const fs      = require('fs');
const path    = require('path');
const router  = express.Router();

const FLORES_DIR = path.join(__dirname, '..', 'love', 'lugares_sitios_que_me_recuerdan_a_ti', 'Flores');
const REL_BASE   = 'lugares_sitios_que_me_recuerdan_a_ti/Flores';

const IMG_RE  = /\.(jpe?g|png|webp|gif|avif)$/i;
const DATE_RE = /^(\d{2})-(\d{2})-(\d{2})$/;   // dd-mm-yy
const MESES   = ['enero','febrero','marzo','abril','mayo','junio','julio',
                 'agosto','septiembre','octubre','noviembre','diciembre'];

const rtxt = f => { try { return fs.readFileSync(path.join(FLORES_DIR, f), 'utf-8').trim() } catch(_) { return '' } };
const url  = (...segs) => '/love/' + [REL_BASE, ...segs].join('/').split('/').map(encodeURIComponent).join('/');

function fechaLabel(dd, mm, yy) {
  const d = parseInt(dd, 10), m = parseInt(mm, 10);
  return `${d} de ${MESES[m - 1] || '?'} de 20${yy}`;
}

/* GET /api/flores  →  { intro, outro, dates:[{ key, iso, label, photos:[url...] }] } */
router.get('/', (_req, res) => {
  try {
    const payload = { intro: rtxt('textoprincipal.txt'), outro: rtxt('texto1.txt'), dates: [] };

    if (fs.existsSync(FLORES_DIR)) {
      for (const name of fs.readdirSync(FLORES_DIR)) {
        const m = name.match(DATE_RE);
        if (!m) continue;
        const dir = path.join(FLORES_DIR, name);
        if (!fs.statSync(dir).isDirectory()) continue;

        const photos = fs.readdirSync(dir)
          .filter(f => IMG_RE.test(f))
          .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
          .map(f => url(name, f));
        if (!photos.length) continue;

        const [, dd, mm, yy] = m;
        payload.dates.push({ key: name, iso: `20${yy}-${mm}-${dd}`, label: fechaLabel(dd, mm, yy), photos });
      }
    }

    payload.dates.sort((a, b) => a.iso.localeCompare(b.iso));
    res.json(payload);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
