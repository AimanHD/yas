/**
 * JSON-based database — no native compilation needed.
 * Stores all data in data/yasmin.json
 */
const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, 'yasmin.json');

class DB {
  constructor() { this._load() }

  _load() {
    try { this.d = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) }
    catch { this.d = { letters:[], notes:[], poems:[], gallery:[], capsules:[], dates:[], settings:{} } }
  }

  _save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.d, null, 2));
  }

  _nextId(table) {
    const rows = this.d[table] || [];
    return rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
  }

  getAll(table, sortBy = 'id', dir = 'asc') {
    const rows = [...(this.d[table] || [])];
    rows.sort((a, b) => {
      const av = a[sortBy] ?? '', bv = b[sortBy] ?? '';
      return dir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
    return rows;
  }

  getOne(table, id) { return (this.d[table] || []).find(r => r.id == id) || null }

  insert(table, data) {
    if (!this.d[table]) this.d[table] = [];
    const row = { id: this._nextId(table), created_at: new Date().toISOString(), ...data };
    this.d[table].push(row);
    this._save();
    return row;
  }

  update(table, id, data) {
    const idx = (this.d[table] || []).findIndex(r => r.id == id);
    if (idx < 0) return false;
    this.d[table][idx] = { ...this.d[table][idx], ...data };
    this._save();
    return true;
  }

  remove(table, id) {
    const before = (this.d[table] || []).length;
    this.d[table] = (this.d[table] || []).filter(r => r.id != id);
    this._save();
    return this.d[table].length < before;
  }

  getSetting(key, def = '') { return this.d.settings?.[key] ?? def }
  setSetting(key, value)   { this.d.settings = { ...(this.d.settings||{}), [key]: value }; this._save() }
  getAllSettings()          { return this.d.settings || {} }
}

const db = new DB();

function seed() {
  if (db.d.letters && db.d.letters.length > 0) return;

  const loveDir = path.join(__dirname, 'love');

  const txtLetters = [
    { file:'En el interior de las calles de aqu.txt',   title:'La floristería de Granada',    subtitle:'Una historia de jazmines mágicos',   type:'story'  },
    { file:'Erase una vez, un chico joven de un.txt',   title:'La luna llamada Yasmin',        subtitle:'Una historia de lunas y jardines',   type:'story'  },
    { file:'Hoy a dia 14082026 a las 116, mi mu.txt',   title:'¿Por qué te quiero tanto?',     subtitle:'14 de agosto de 2026, 1:16',         type:'letter' },
    { file:'respiro.txt',                               title:'Te quiero en todas tus formas', subtitle:'Una carta sobre el amor real',        type:'letter' },
    { file:'barco.txt',                                 title:'El barco que llegó hasta ti',   subtitle:'Una historia de mares y destinos',   type:'story'  },
  ];

  for (const l of txtLetters) {
    try {
      const content = fs.readFileSync(path.join(loveDir, l.file), 'utf-8').trim();
      db.insert('letters', { title:l.title, subtitle:l.subtitle, content, type:l.type });
    } catch (_) {}
  }

  const pdfLetters = [
    { file:'Carta_para_Yasmin.pdf',                subtitle:'Con todo mi corazón',               title:'Carta para Yasmin'                     },
    { file:'Las-Mil-y-Una-Noches-de-Babilonia.pdf',subtitle:'Un cuento de amor eterno',          title:'Las Mil y Una Noches de Babilonia'     },
    { file:'El_Eclipse_Eterno.pdf',                subtitle:'Cuando la luz eres tú',             title:'El Eclipse Eterno'                     },
    { file:'La_Princesa_de_Ojos_de_Noche.pdf',    subtitle:'Para ti, mi princesa',              title:'La Princesa de Ojos de Noche'          },
    { file:'Carta de amor a tus ojos.pdf',         subtitle:'Dedicada a tu mirada',             title:'Carta de Amor a Tus Ojos'              },
    { file:'El Tesoro Mejor Guardado.pdf',         subtitle:'Mi mayor tesoro eres tú',          title:'El Tesoro Mejor Guardado'              },
  ];

  for (const l of pdfLetters) {
    if (fs.existsSync(path.join(loveDir, l.file)))
      db.insert('letters', { title:l.title, subtitle:l.subtitle, filename:l.file, type:'letter' });
  }

  // Default settings
  db.setSetting('start_date', '2026-07-01');
  db.setSetting('her_name',   'Yasmin');
  db.setSetting('your_name',  'Aiman');

  // Default dates
  db.insert('dates', { title:'Primer día juntos',    date:'2026-07-01', description:'El día que comenzó todo ♥',   icon:'💕', recurring:1 });
  db.insert('dates', { title:'Cumpleaños de Yasmin', date:'2026-01-01', description:'El día más especial del año', icon:'🎂', recurring:1 });

  console.log('✓ Base de datos inicializada con cartas y configuración');
}

module.exports = { db, seed };
