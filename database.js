/**
 * database.js — dual mode:
 *   LOCAL  (sin DATABASE_URL) → JSON file en data/yasmin.json
 *   PROD   (con DATABASE_URL) → PostgreSQL / Supabase via pg
 */
const fs   = require('fs');
const path = require('path');

/* ════════════════════════════════════════════
   JSON DATABASE  (desarrollo local)
════════════════════════════════════════════ */
class JSONDB {
  constructor() {
    const dir = path.join(__dirname, 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this._path = path.join(dir, 'yasmin.json');
    this._load();
  }

  _load() {
    try { this.d = JSON.parse(fs.readFileSync(this._path, 'utf-8')) }
    catch { this.d = { letters:[],notes:[],poems:[],gallery:[],capsules:[],dates:[],movies:[],settings:{} } }
  }
  _save() { fs.writeFileSync(this._path, JSON.stringify(this.d, null, 2)) }
  _nextId(t) { const r = this.d[t]||[]; return r.length ? Math.max(...r.map(x=>x.id))+1 : 1 }

  async getAll(table, sortBy='id', dir='asc') {
    const rows = [...(this.d[table]||[])];
    rows.sort((a,b)=>{ const av=a[sortBy]??'',bv=b[sortBy]??''; return dir==='asc'?(av>bv?1:-1):(av<bv?1:-1) });
    return rows;
  }
  async getOne(table,id) { return (this.d[table]||[]).find(r=>r.id==id)||null }
  async insert(table,data) {
    if(!this.d[table]) this.d[table]=[];
    const row={id:this._nextId(table),created_at:new Date().toISOString(),...data};
    this.d[table].push(row); this._save(); return row;
  }
  async update(table,id,data) {
    const i=(this.d[table]||[]).findIndex(r=>r.id==id);
    if(i<0) return false;
    this.d[table][i]={...this.d[table][i],...data}; this._save(); return true;
  }
  async remove(table,id) {
    const b=(this.d[table]||[]).length;
    this.d[table]=(this.d[table]||[]).filter(r=>r.id!=id); this._save();
    return (this.d[table]||[]).length<b;
  }
  async getSetting(key,def='') { return this.d.settings?.[key]??def }
  async setSetting(key,value) { this.d.settings={...(this.d.settings||{}),[key]:value}; this._save() }
  async getAllSettings() { return this.d.settings||{} }
  async count(table) { return (this.d[table]||[]).length }
}

/* ════════════════════════════════════════════
   POSTGRESQL / SUPABASE  (producción)
════════════════════════════════════════════ */
class PostgresDB {
  constructor() { this._pool = null }

  _getPool() {
    if (!this._pool) {
      const { Pool } = require('pg');
      this._pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 5,
      });
    }
    return this._pool;
  }

  async _q(sql, params=[]) {
    const { rows } = await this._getPool().query(sql, params);
    return rows;
  }

  async getAll(table, sortBy='id', dir='asc') {
    const col = sortBy.replace(/[^a-z_]/gi,'');
    const d   = dir==='desc' ? 'DESC' : 'ASC';
    return this._q(`SELECT * FROM "${table}" ORDER BY "${col}" ${d}`);
  }
  async getOne(table,id) {
    const rows = await this._q(`SELECT * FROM "${table}" WHERE id=$1`,[id]);
    return rows[0]||null;
  }
  async insert(table,data) {
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const colList = cols.map(c=>`"${c}"`).join(',');
    const ph      = cols.map((_,i)=>`$${i+1}`).join(',');
    const rows = await this._q(
      `INSERT INTO "${table}" (${colList}) VALUES (${ph}) RETURNING *`, vals
    );
    return rows[0];
  }
  async update(table,id,data) {
    const cols = Object.keys(data);
    const vals = [...Object.values(data), id];
    const set  = cols.map((c,i)=>`"${c}"=$${i+1}`).join(',');
    await this._q(`UPDATE "${table}" SET ${set} WHERE id=$${cols.length+1}`, vals);
    return true;
  }
  async remove(table,id) {
    await this._q(`DELETE FROM "${table}" WHERE id=$1`,[id]);
    return true;
  }
  async getSetting(key,def='') {
    const rows = await this._q('SELECT value FROM settings WHERE key=$1',[key]);
    return rows[0]?.value ?? def;
  }
  async setSetting(key,value) {
    await this._q(
      'INSERT INTO settings(key,value) VALUES($1,$2) ON CONFLICT(key) DO UPDATE SET value=$2',
      [key,value]
    );
  }
  async getAllSettings() {
    const rows = await this._q('SELECT key,value FROM settings');
    return rows.reduce((acc,r)=>({...acc,[r.key]:r.value}),{});
  }
  async count(table) {
    const rows = await this._q(`SELECT COUNT(*) as n FROM "${table}"`);
    return parseInt(rows[0]?.n || 0);
  }

  async createTables() {
    const sql   = fs.readFileSync(path.join(__dirname,'schema.sql'),'utf-8');
    const stmts = sql.split(';').map(s=>s.trim()).filter(s=>s && !s.startsWith('--'));
    for (const stmt of stmts) {
      try { await this._getPool().query(stmt) } catch(_) {}
    }
  }
}

/* ── CHOOSE IMPLEMENTATION ── */
const db = process.env.DATABASE_URL ? new PostgresDB() : new JSONDB();

/* ════════════════════════════════════════════
   SEED — same logic for both implementations
════════════════════════════════════════════ */
async function seed() {
  const loveDir = path.join(__dirname, 'love');

  if (db instanceof PostgresDB) await db.createTables();

  /* SETTINGS */
  if (!(await db.getSetting('start_date'))) {
    await db.setSetting('start_date', '2026-06-30');
    await db.setSetting('her_name',   'Yasmin');
    await db.setSetting('your_name',  'Aiman');
  }

  /* LETTERS */
  if ((await db.count('letters')) === 0) {
    const txtLetters = [
      { file:'En el interior de las calles de aqu.txt', title:'La floristería de Granada',        subtitle:'Una historia de jazmines mágicos',     type:'story'  },
      { file:'Erase una vez, un chico joven de un.txt', title:'La luna llamada Yasmin',            subtitle:'Una historia de lunas y jardines',     type:'story'  },
      { file:'Hoy a dia 14082026 a las 116, mi mu.txt', title:'¿Por qué te quiero tanto?',         subtitle:'14 de agosto de 2026, 1:16',           type:'letter' },
      { file:'respiro.txt',                             title:'Te quiero en todas tus formas',      subtitle:'Una carta sobre el amor real',         type:'letter' },
      { file:'barco.txt',                               title:'El barco que llegó hasta ti',        subtitle:'Una historia de mares y destinos',     type:'story'  },
      { file:'19082026.txt',                            title:'Dos meses contigo',                  subtitle:'19 de agosto de 2026',                 type:'letter' },
      { file:'verterespirar.txt',                       title:'Verte respirar',                     subtitle:'Una noche de luna llena en el puerto', type:'letter' },
      { file:'epoca70.txt',                             title:'La playa eres tú',                   subtitle:'Una historia de los años 70',          type:'story'  },
    ];
    for (const l of txtLetters) {
      try {
        const content = fs.readFileSync(path.join(loveDir, l.file), 'utf-8').trim();
        await db.insert('letters', { title:l.title, subtitle:l.subtitle, content, type:l.type });
      } catch(_) {}
    }
    const pdfLetters = [
      { file:'Carta_para_Yasmin.pdf',                  title:'Carta para Yasmin',                subtitle:'Con todo mi corazón'             },
      { file:'Las-Mil-y-Una-Noches-de-Babilonia.pdf',  title:'Las Mil y Una Noches de Babilonia', subtitle:'Un cuento de amor eterno'        },
      { file:'El_Eclipse_Eterno.pdf',                  title:'El Eclipse Eterno',                subtitle:'Cuando la luz eres tú'           },
      { file:'La_Princesa_de_Ojos_de_Noche.pdf',       title:'La Princesa de Ojos de Noche',     subtitle:'Para ti, mi princesa'            },
      { file:'Carta de amor a tus ojos.pdf',           title:'Carta de Amor a Tus Ojos',         subtitle:'Dedicada a tu mirada'            },
      { file:'El Tesoro Mejor Guardado.pdf',           title:'El Tesoro Mejor Guardado',         subtitle:'Mi mayor tesoro eres tú'         },
      { file:'Nota para Yasmin.pdf',                   title:'Nota para Yasmin',                 subtitle:'Un pensamiento para ti'          },
    ];
    for (const l of pdfLetters) {
      if (fs.existsSync(path.join(loveDir, l.file)))
        await db.insert('letters', { title:l.title, subtitle:l.subtitle, filename:l.file, type:'letter' });
    }
    console.log('  Cartas:', await db.count('letters'));
  }

  /* POEMS */
  if ((await db.count('poems')) === 0) {
    try {
      const content = fs.readFileSync(path.join(loveDir,'textoflores.txt'),'utf-8').trim();
      await db.insert('poems', { title:'Las flores de Yasmin', content, type:'poem' });
    } catch(_) {}
  }

  /* GALLERY */
  if ((await db.count('gallery')) === 0) {
    const photos = [
      { photo:'notas de fotos/foto1.jpeg', nota:'notas de fotos/nota1.txt', title:'Tu confianza'        },
      { photo:'notas de fotos/foto2.jpeg', nota:'notas de fotos/nota2.txt', title:'La perfección'       },
      { photo:'notas de fotos/foto3.jpeg', nota:'notas de fotos/nota3.txt', title:'Mi fantasía'         },
      { photo:'notas de fotos/foto4.jpeg', nota:'notas de fotos/nota4.txt', title:'Mis ojos'            },
      { photo:'notas de fotos/foto5.jpeg', nota:'notas de fotos/nota5.txt', title:'Perfecta'            },
      { photo:'notas de fotos/foto6.jpeg', nota:'notas de fotos/nota6.txt', title:'Tu piel'             },
      { photo:'notas de fotos/foto7.jpeg', nota:'notas de fotos/nota7.txt', title:'Esos ojos'           },
      { photo:'notas de fotos/foto8.jpeg', nota:'notas de fotos/nota8.txt', title:'La niña de mis ojos' },
      { photo:'notas de fotos/foto9.jpeg',  nota:'notas de fotos/nota9.txt',  title:'Tu brillo'          },
      { photo:'notas de fotos/foto10.jpeg', nota:'notas de fotos/nota10.txt', title:'La primera vez'     },
      { photo:'notas de fotos/foto11.jpeg', nota:'notas de fotos/nota11.txt', title:'La Alhambra contigo'},
      { photo:'notas de fotos/foto12.jpeg', nota:'notas de fotos/nota12.txt', title:'Pizza en el portal' },
      { photo:'notas de fotos/foto13.jpeg', nota:'notas de fotos/nota13.txt', title:'Viéndote disfrutar' },
      { photo:'fotonormal/foto.jpeg',       nota:'fotonormal/fotonormal.txt', title:'Conectados'         },
    ];
    for (const p of photos) {
      if (!fs.existsSync(path.join(loveDir, p.photo))) continue;
      let desc = '';
      try { desc = fs.readFileSync(path.join(loveDir, p.nota),'utf-8').trim() } catch(_) {}
      const src = '/love/' + p.photo.split('/').map(encodeURIComponent).join('/');
      await db.insert('gallery', { src, title:p.title, description:desc, seeded:true });
    }
    console.log('  Galería:', await db.count('gallery'));
  }

  /* NOTES */
  if ((await db.count('notes')) === 0) {
    const notes = [
      { date:'2026-07-01', title:'El primer día', mood:'🥰', content:'Hoy empezó todo. No sé cómo explicarlo, pero desde que estás tú, el mundo huele diferente. Estoy muy feliz.' },
      { date:'2026-07-08', title:'Una semana juntos', mood:'🌸', content:'Una semana ya. Parece poco tiempo pero contigo cada día tiene el peso de una vida entera. Me has mirado hoy de una manera que no voy a olvidar.' },
      { date:'2026-07-15', title:'Te vi reír', mood:'🌟', content:'Hoy te vi reír a carcajadas por algo tonto y pensé: quiero escuchar esa risa el resto de mi vida. No hay música mejor.' },
      { date:'2026-07-22', title:'Un miércoles normal', mood:'😊', content:'No pasó nada especial. Solo estuvimos juntos. Y fue perfecto. Eso es lo que más me gusta de estar contigo, que los días normales se vuelven especiales.' },
      { date:'2026-07-29', title:'Te echaba de menos', mood:'💭', content:'Hoy no te vi y lo noté en todo. En el café de la mañana, en el silencio del cuarto, en las canciones que me ponía. Te echo de menos cuando no estás.' },
      { date:'2026-08-05', title:'Agosto contigo', mood:'🔥', content:'Agosto siempre fue mi mes favorito. Este año lo es aún más. Tú eres el motivo.' },
      { date:'2026-08-10', title:'Lo que más me gusta de ti', mood:'💫', content:'Tu forma de escuchar. Cuando te cuento algo, lo escuchas de verdad. No finges. Me miras. Y eso vale más que mil palabras bonitas.' },
      { date:'2026-08-14', title:'Dos meses casi', mood:'🥰', content:'Casi dos meses. Me parece imposible que haya un tiempo en el que no te conocía. ¿Cómo era todo antes?' },
      { date:'2026-08-19', title:'Dos meses', mood:'🌙', content:'Dos meses contigo. Dos meses de aprender qué es querer a alguien de verdad. Gracias por existir, Yasmin.' },
    ];
    for (const n of notes) await db.insert('notes', n);
    console.log('  Notas:', await db.count('notes'));
  }

  /* DATES */
  if ((await db.count('dates')) === 0) {
    await db.insert('dates', { title:'Primer día juntos',    date:'2026-07-01', description:'El día que comenzó todo', icon:'', recurring:true });
    await db.insert('dates', { title:'Cumpleaños de Yasmin', date:'2026-01-01', description:'El día más especial',     icon:'', recurring:true });
  }

  console.log('  Base de datos lista');
}

module.exports = { db, seed };
