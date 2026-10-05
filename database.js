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
    catch { this.d = { letters:[],notes:[],poems:[],gallery:[],capsules:[],dates:[],movies:[],memories:[],settings:{} } }
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
        connectionTimeoutMillis: 8000,
        idleTimeoutMillis: 30000,
      });
      this._pool.on('error', err => console.error('Postgres pool error:', err.message));
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

  const rtxt = f => { try { return fs.readFileSync(path.join(loveDir, f), 'utf-8').trim() } catch(_) { return '' } };
  const ymd  = d => (d instanceof Date ? d.toISOString() : String(d || '')).slice(0, 10);
  // Inserta solo las filas cuya clave aún no existe → sirve para BD nuevas y para añadir contenido a la de producción
  async function ensure(table, rows, key = r => r.title) {
    const have = new Set((await db.getAll(table)).map(key));
    for (const r of rows) if (!have.has(key(r))) await db.insert(table, r);
  }

  /* LETTERS — texto (lector de libro), PDF e imágenes (tarjetas) */
  {
    const letters = [];
    const txtLetters = [
      { file:'En el interior de las calles de aqu.txt',           title:'La floristería de Granada',     subtitle:'Una historia de jazmines mágicos',         type:'story'  },
      { file:'Erase una vez, un chico joven de un.txt',           title:'La luna llamada Yasmin',        subtitle:'Una historia de lunas y jardines',         type:'story'  },
      { file:'Hoy a dia 14082026 a las 116, mi mu.txt',           title:'¿Por qué te quiero tanto?',     subtitle:'14 de agosto de 2026, 1:16',               type:'letter' },
      { file:'respiro.txt',                                       title:'Te quiero en todas tus formas', subtitle:'Una carta sobre el amor real',             type:'letter' },
      { file:'barco.txt',                                         title:'El barco que llegó hasta ti',   subtitle:'Una historia de mares y destinos',         type:'story'  },
      { file:'19082026.txt',                                      title:'Dos meses contigo',             subtitle:'19 de agosto de 2026',                     type:'letter' },
      { file:'verterespirar.txt',                                 title:'Verte respirar',                subtitle:'Una noche de luna llena en el puerto',     type:'letter' },
      { file:'epoca70.txt',                                       title:'La playa eres tú',              subtitle:'Una historia de los años 70',              type:'story'  },
      { file:'fotonormal/Hola soy Aiman Harrar Daoud, tengo.txt', title:'Esa eres tú',                   subtitle:'Todo lo que soñé, y lo que siempre serás', type:'letter' },
    ];
    for (const l of txtLetters) {
      const content = rtxt(l.file);
      if (content) letters.push({ title:l.title, subtitle:l.subtitle, content, type:l.type });
    }
    const fileLetters = [
      { file:'Carta_para_Yasmin.pdf',                 title:'Carta para Yasmin',                subtitle:'Con todo mi corazón'      },
      { file:'Las-Mil-y-Una-Noches-de-Babilonia.pdf', title:'Las Mil y Una Noches de Babilonia', subtitle:'Un cuento de amor eterno' },
      { file:'El_Eclipse_Eterno.pdf',                 title:'El Eclipse Eterno',                subtitle:'Cuando la luz eres tú'    },
      { file:'La_Princesa_de_Ojos_de_Noche.pdf',      title:'La Princesa de Ojos de Noche',     subtitle:'Para ti, mi princesa'     },
      { file:'Carta de amor a tus ojos.pdf',          title:'Carta de Amor a Tus Ojos',         subtitle:'Dedicada a tu mirada'     },
      { file:'El Tesoro Mejor Guardado.pdf',          title:'El Tesoro Mejor Guardado',         subtitle:'Mi mayor tesoro eres tú'  },
      { file:'Nota para Yasmin.pdf',                  title:'Nota para Yasmin',                 subtitle:'Un pensamiento para ti'   },
      { file:'notita para mi amor.png',               title:'Una notita para mi amor',          subtitle:'21 · 09 · 2001, el día que empezó todo' },
      { file:'Feliz_Cumple_Yasmin.png',               title:'Feliz Cumpleaños, Yasmin',         subtitle:'Con todo mi amor'         },
      { file:'Para_Yasmin_florecer.png',              title:'Para florecer',                    subtitle:'Poco a poco y sin presión' },
    ];
    for (const l of fileLetters) {
      if (fs.existsSync(path.join(loveDir, l.file)))
        letters.push({ title:l.title, subtitle:l.subtitle, filename:l.file, type:'letter' });
    }
    await ensure('letters', letters);
    console.log('  Cartas:', await db.count('letters'));
  }

  /* POEMS — textoflores.txt (chat de WhatsApp) se separa en un poema por flor */
  {
    const raw = rtxt('textoflores.txt');
    const TITLES = ['El trébol de cuatro hojas', 'El girasol', 'El hibisco', 'La flor caída', 'La flor de cerezo', 'Rosa, tulipán y ramo'];
    const flores = raw.split(/\r?\n(?=\[)/)
      .map(l => l.replace(/^\[[^\]]*\]\s*\.:\s*/, '').replace(/^[^:]*yasmin\s*:\s*/i, '').trim())
      .filter(Boolean);
    if (flores.length === TITLES.length) {
      // el poema antiguo era el chat en bruto: se retira solo si nadie lo ha editado
      for (const p of await db.getAll('poems'))
        if (p.title === 'Las flores de Yasmin' && String(p.content).trim() === raw) await db.remove('poems', p.id);
      // orden inverso: la lista se muestra por fecha de creación descendente
      const rows = flores.map((content, i) => ({ title:TITLES[i], content, type:'poem' })).reverse();
      await ensure('poems', rows);
    }
    console.log('  Poemas:', await db.count('poems'));
  }

  /* GALLERY — inserta solo las fotos que aún no están */
  {
    const photos = [
      { photo:'notas de fotos/foto1.jpeg',  nota:'notas de fotos/nota1.txt',  title:'Tu confianza'         },
      { photo:'notas de fotos/foto2.jpeg',  nota:'notas de fotos/nota2.txt',  title:'La perfección'        },
      { photo:'notas de fotos/foto3.jpeg',  nota:'notas de fotos/nota3.txt',  title:'Mi fantasía'          },
      { photo:'notas de fotos/foto4.jpeg',  nota:'notas de fotos/nota4.txt',  title:'Mis ojos'             },
      { photo:'notas de fotos/foto5.jpeg',  nota:'notas de fotos/nota5.txt',  title:'Perfecta'             },
      { photo:'notas de fotos/foto6.jpeg',  nota:'notas de fotos/nota6.txt',  title:'Tu piel'              },
      { photo:'notas de fotos/foto7.jpeg',  nota:'notas de fotos/nota7.txt',  title:'Esos ojos'            },
      { photo:'notas de fotos/foto8.jpeg',  nota:'notas de fotos/nota8.txt',  title:'La niña de mis ojos'  },
      { photo:'notas de fotos/foto9.jpeg',  nota:'notas de fotos/nota9.txt',  title:'Tu brillo'            },
      { photo:'notas de fotos/foto10.jpeg', nota:'notas de fotos/nota10.txt', title:'La primera vez'       },
      { photo:'notas de fotos/foto11.jpeg', nota:'notas de fotos/nota11.txt', title:'La Alhambra contigo'  },
      { photo:'notas de fotos/foto12.jpeg', nota:'notas de fotos/nota12.txt', title:'Pizza en el portal'   },
      { photo:'notas de fotos/foto13.jpeg', nota:'notas de fotos/nota13.txt', title:'Viéndote disfrutar'   },
      { photo:'fotonormal/foto.jpeg',       nota:'fotonormal/fotonormal.txt', title:'Conectados'           },
    ];
    const rows = photos
      .filter(p => fs.existsSync(path.join(loveDir, p.photo)))
      .map(p => ({
        src: '/love/' + p.photo.split('/').map(encodeURIComponent).join('/'),
        title: p.title, description: rtxt(p.nota), seeded: true,
      }));
    await ensure('gallery', rows, g => g.src);
    console.log('  Galería:', await db.count('gallery'));
  }

  /* NOTES — mood es una clave (ver MOODS en app.js); las notas antiguas con emoji siguen funcionando */
  {
    const notes = [
      { date:'2026-07-01', title:'El primer día', mood:'amor', content:'Hoy empezó todo. No sé cómo explicarlo, pero desde que estás tú, el mundo huele diferente. Estoy muy feliz.' },
      { date:'2026-07-08', title:'Una semana juntos', mood:'flor', content:'Una semana ya. Parece poco tiempo pero contigo cada día tiene el peso de una vida entera. Me has mirado hoy de una manera que no voy a olvidar.' },
      { date:'2026-07-15', title:'Te vi reír', mood:'brillo', content:'Hoy te vi reír a carcajadas por algo tonto y pensé: quiero escuchar esa risa el resto de mi vida. No hay música mejor.' },
      { date:'2026-07-22', title:'Un miércoles normal', mood:'feliz', content:'No pasó nada especial. Solo estuvimos juntos. Y fue perfecto. Eso es lo que más me gusta de estar contigo, que los días normales se vuelven especiales.' },
      { date:'2026-07-29', title:'Te echaba de menos', mood:'pensando', content:'Hoy no te vi y lo noté en todo. En el café de la mañana, en el silencio del cuarto, en las canciones que me ponía. Te echo de menos cuando no estás.' },
      { date:'2026-08-05', title:'Agosto contigo', mood:'fuego', content:'Agosto siempre fue mi mes favorito. Este año lo es aún más. Tú eres el motivo.' },
      { date:'2026-08-10', title:'Lo que más me gusta de ti', mood:'magia', content:'Tu forma de escuchar. Cuando te cuento algo, lo escuchas de verdad. No finges. Me miras. Y eso vale más que mil palabras bonitas.' },
      { date:'2026-08-14', title:'Dos meses casi', mood:'amor', content:'Casi dos meses. Me parece imposible que haya un tiempo en el que no te conocía. ¿Cómo era todo antes?' },
      { date:'2026-08-19', title:'Dos meses', mood:'luna', content:'Dos meses contigo. Dos meses de aprender qué es querer a alguien de verdad. Gracias por existir, Yasmin.' },
    ];
    // textos reales de love/ que encajan como nota del día
    const especial = rtxt('nota especial.txt');
    if (especial) notes.push({ date:'2026-08-22', title:'Para tus días cansados', mood:'luna', content:especial });
    const loQueVeo = rtxt('fotonormal/Independientemente de lo que tu pie.txt');
    if (loQueVeo) notes.push({ date:'2026-09-21', title:'Lo que yo veo', mood:'brillo', content:loQueVeo });
    await ensure('notes', notes);
    console.log('  Notas:', await db.count('notes'));
  }

  /* DATES — fechas que salen del propio contenido de love/ */
  {
    for (const d of await db.getAll('dates')) {
      // restos del seed antiguo: el aniversario es el 30 de junio y el cumple no es el 1 de enero
      if (d.title === 'Primer día juntos' && ymd(d.date) === '2026-07-01')
        await db.update('dates', d.id, { date:'2026-06-30' });
      if (d.title === 'Cumpleaños de Yasmin' && ymd(d.date) === '2026-01-01')
        await db.remove('dates', d.id);
    }
    await ensure('dates', [
      { title:'Primer día juntos',    date:'2026-06-30', description:'El día que comenzó todo',              icon:'heart',  recurring:true  },
      { title:'Cumpleaños de Yasmin', date:'2001-09-21', description:'El día que el mundo empezó a brillar', icon:'cake',   recurring:true  },
      { title:'Tu primera visita',    date:'2026-07-28', description:'Paseos, aceitunas y aquel pastel',     icon:'pin',    recurring:true  },
      { title:'El primer ramo',       date:'2026-08-07', description:'Aquí empezó nuestro jardín',           icon:'flower', recurring:true  },
      { title:'Los 100 días',         date:'2026-10-08', description:'Ese día se abre el sobre',             icon:'letter', recurring:false },
    ]);
    if (!(await db.getSetting('birthday'))) await db.setSetting('birthday', '2001-09-21');
  }

  /* MEMORIES — seed desde love/lugares_sitios_que_me_recuerdan_a_ti/ */
  {
    const memDir = path.join(loveDir, 'lugares_sitios_que_me_recuerdan_a_ti');
    if (fs.existsSync(memDir)) {
      const existing   = await db.getAll('memories');
      const existSrcs  = new Set(existing.map(m => m.src).filter(Boolean));
      const rtxt = p  => { try { return fs.readFileSync(p,'utf-8').trim() } catch(_){ return '' } };
      const mUrl = f  => '/love/lugares_sitios_que_me_recuerdan_a_ti/' + f.split('/').map(encodeURIComponent).join('/');

      const GROUPS = [
        {
          key:'05-06-26', title:'5 de junio de 2026', sub:'Antes de ti, ya eras todo', sort:0,
          text: rtxt(path.join(memDir,'05-06-26','texto.txt')),
          photos:[
            { f:'05-06-26/WhatsApp Image 2026-08-22 at 17.23.00.jpeg' },
            { f:'05-06-26/WhatsApp Image 2026-08-22 at 17.23.01.jpeg' },
          ],
        },
        {
          key:'30-06-26', title:'30 de junio de 2026', sub:'El primer día juntos', sort:1,
          text: rtxt(path.join(memDir,'30-06-26','texto.txt')),
          photos:[{ f:'30-06-26/WhatsApp Image 2026-08-22 at 17.23.03.jpeg' }],
        },
        {
          key:'12-07-26', title:'12 de julio de 2026', sub:'Los primeros días', sort:2,
          text: rtxt(path.join(memDir,'12-07-26','texto.txt')),
          photos:[{ f:'12-07-26/WhatsApp Image 2026-08-22 at 17.23.03.jpeg' }],
        },
        {
          key:'21-07-26', title:'21 de julio de 2026', sub:'Cuando te pensaba desde lejos', sort:3,
          text: rtxt(path.join(memDir,'21-07-26','textp.txt')),
          photos:[
            { f:'21-07-26/1.jpeg',    feat:true },
            { f:'21-07-26/11.jpeg',   feat:true },
            { f:'21-07-26/111.jpeg',  feat:true },
            { f:'21-07-26/1111.jpeg', feat:true },
            { f:'21-07-26/WhatsApp Image 2026-08-22 at 17.23.01.jpeg' },
            { f:'21-07-26/WhatsApp Image 2026-08-22 at 17.23.02.jpeg' },
            { f:'21-07-26/g.jpeg' },
          ],
        },
        {
          key:'28-07-26', title:'28 de julio de 2026', sub:'Tu primera visita', sort:4,
          text: rtxt(path.join(memDir,'28-07-26','texto.txt')),
          photos:[{ f:'28-07-26/WhatsApp Image 2026-08-22 at 17.23.01.jpeg' }],
        },
        {
          key:'06-08-26', title:'6 de agosto de 2026', sub:'Merienda en Algeciras', sort:5,
          text: rtxt(path.join(memDir,'06-08-26','text.txt')),
          photos:[{ f:'06-08-26/foto1.jpeg' }],
        },
        {
          key:'21-08-26', title:'21 de agosto de 2026', sub:'Villa en Marbella', sort:6,
          text: rtxt(path.join(memDir,'21-08-26','texto.txt')),
          photos:[
            { f:'21-08-26/WhatsApp Image 2026-08-22 at 16.06.35.jpeg' },
            { f:'21-08-26/WhatsApp Image 2026-08-22 at 16.06.35 (1).jpeg' },
            { f:'21-08-26/WhatsApp Image 2026-08-22 at 16.06.35 (2).jpeg' },
            { f:'21-08-26/WhatsApp Image 2026-08-22 at 16.06.35 (3).jpeg' },
            { f:'21-08-26/foto2.jpeg' },
          ],
        },
        // "Flores" ahora es su propia sección (routes/flores.js) — ya no se siembra aquí
        {
          key:'Paisajes', title:'Paisajes que te llevan', sub:'Donde te pienso', sort:8,
          text:'',
          photos:[
            { f:'Paisajes/foto1.jpeg', note: rtxt(path.join(memDir,'Paisajes','foto1.txt')) },
            { f:'Paisajes/foto2.jpeg', note: rtxt(path.join(memDir,'Paisajes','texto2.txt')) },
          ],
        },
        {
          key:'Cosas', title:'Cositas que te llevan', sub:'Objetos que me recuerdan a ti', sort:9,
          text:'',
          photos:[
            { f:'Cosas/foto1.jpeg', note: rtxt(path.join(memDir,'Cosas','texto1.txt')) },
            { f:'Cosas/foto2.jpeg', note: rtxt(path.join(memDir,'Cosas','texto2.txt')) },
            { f:'Cosas/foto3.jpeg', note: rtxt(path.join(memDir,'Cosas','texto3.txt')) },
            { f:'Cosas/foto4.jpeg', note: rtxt(path.join(memDir,'Cosas','texto4.txt')) },
          ],
        },
      ];

      for (const g of GROUPS) {
        let idx = 0;
        for (const p of g.photos) {
          const full = path.join(memDir, p.f.replace(/\//g, path.sep));
          if (!fs.existsSync(full)) { idx++; continue; }
          const src = mUrl(p.f);
          if (existSrcs.has(src)) { idx++; continue; }
          await db.insert('memories', {
            group_key:   g.key,
            group_title: g.title,
            group_sub:   g.sub,
            group_text:  g.text || '',
            photo_note:  p.note || '',
            src,
            is_featured: p.feat || false,
            sort_order:  g.sort * 100 + idx,
            seeded:      true,
          });
          idx++;
        }
      }
      console.log('  Recuerdos:', await db.count('memories'));
    }
  }

  console.log('  Base de datos lista');
}

module.exports = { db, seed };
