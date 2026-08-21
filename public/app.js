/* ── YASMIN APP ── */

// ── SVG ICONS ──
const ICONS = {
  home:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  letters: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  notes:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 9.5-9.5z"/></svg>`,
  poems:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  barbie:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
  details: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  pdf:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="44" height="44"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  play:    `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  plus:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  edit:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  upload:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="36" height="36"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>`,
  wheel:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>`,
};

// ── FRASES ──
const FRASES = [
  "Eres el jazmín, la luz y el cielo, todo junto en una persona.",
  "Mis latidos, según como estés tú, laten más o menos tranquilos.",
  "Te quiero cuando estás bien, pero también cuando solo quieres respirar y existir.",
  "No hay nada más valioso que seguir construyendo un legado en la vida contigo.",
  "Quererte no es solo cuando estés bien, sino en todas tus formas.",
  "Hay otros hombres que podrían darte mil cosas, pero ninguno podría quererte como yo.",
  "Jamás dejaré de leerte cuentos, de darte notitas bonitas en cualquier momento.",
  "Eres mi obsesión, mi vida, el amor de mi vida, y me encantas.",
  "El amor que tengo hacia ti solo tiene una medida: la cantidad de latidos generados para ti.",
  "He aprendido a juntar mi intensidad con tu harmonía y paciencia, y juntos nos complementamos.",
  "Todo lo que hemos creado es un amor y una confianza mutua que me hace ser feliz.",
  "Mi mayor sueño: verte feliz, tranquila y contenta el resto de tu vida.",
  "En esta vida y en el paraíso, eres el amor de mi vida.",
  "Por mucho que me dejes, yo volveré a buscarte, porque eres mi mujer.",
  "Eres la mujer de mis sueños, y lo volvería a construir una y mil veces.",
  "Dios te puso en mi camino, y quizás en algún punto me perdí, pero seguí ceñido hacia ti.",
  "Sin saber que iba a encontrar tu amor después de la tormenta, seguí ese camino.",
  "Eres como la luna llena más brillante que alumbró una casa entera.",
  "En cada flor y planta, había plasmada tu luz y tu nombre: Yasmin.",
  "Desde entonces la luna pasó a ser Yasmin, y le agradezco día tras día esa energía.",
  "Hay algo que no es tan sencillo como encontrarte a ti, Yasmin.",
  "Eres un fenómeno indescriptible, podría ilustrar todo tipo de objetos naturales y nada se equipara.",
  "Me has enseñado a querer como me prometiste: no todo es decir cosas bonitas.",
  "Son esos pequeños gestos que poca gente ve, esa manera que tienes de actuar tan natural.",
  "Tus caricias, abrazos, besos, mordidas... todo vino poco a poco en el momento perfecto.",
  "Quiero que seas mi mujer, y yo quiero ser tu hombre, que es mantenerte, cuidarte y amarte.",
  "Quiero ser recordados por aquellos abrazos, caricias, momentos felices, viajes...",
  "El dinero va y viene, pero siempre todo irá para ti, siempre lucharé para que no te falte nada.",
  "Eres mía y de nadie más, aunque intentes dejarme, te volveré a enamorar.",
  "Te buscaré, te encontraré, te llevaré a donde siempre más te guste ir.",
  "Mi corazón sigue vivo gracias a ti, y mi vida ha cobrado sentido y dirección.",
  "Hacerte feliz, tener una familia contigo, y amarte todos los días de mi vida.",
];

const EXPERIENCES = [
  { icon:'eye',    title:'La Linterna de Yasmin',          desc:'Mueve la luz por la oscuridad y descubre las palabras escondidas en su mirada', url:'/experience/linterna' },
  { icon:'mirror', title:'El Espejo Empañado',             desc:'Pasa el dedo por el espejo y descubre los mensajes ocultos bajo el vaho',       url:'/experience/espejo'   },
  { icon:'moon',   title:'Buenas Noches, Yasmin',          desc:'Toca las estrellas en el cielo nocturno y descubre los pensamientos secretos',   url:'/experience/estrellas'},
  { icon:'flower', title:'Los Globos de Colores',          desc:'Revienta los globos uno a uno y descubre las palabras que te describen',         url:'/experience/globos'   },
  { icon:'book',   title:'Las Mil Maneras en que me Amas', desc:'Un libro antiguo con todas las formas en que su amor se manifiesta cada día',    url:'/experience/libro'    },
];

const EXP_ICONS = {
  eye:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  mirror: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="8" ry="10"/><line x1="12" y1="22" x2="12" y2="24"/><line x1="8" y1="24" x2="16" y2="24"/></svg>`,
  moon:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
  flower: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 010 6M12 16a3 3 0 010 6M2 12a3 3 0 016 0M16 12a3 3 0 016 0M4.93 4.93a3 3 0 014.24 4.24M14.83 14.83a3 3 0 004.24 4.24M4.93 19.07a3 3 0 014.24-4.24M14.83 9.17a3 3 0 014.24-4.24"/></svg>`,
  book:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
};

const SOBRE_100 = `Cien días.

Cien mañanas en las que desperté pensando en ti. Cien noches en las que me dormí con tu nombre en la cabeza. Cien veces que elegí quererte, y cien veces que lo habría vuelto a elegir.

Hay personas que pasan por tu vida como el viento: rápido, sin dejar rastro. Y luego estás tú. Tú te quedaste. Y eso, Yasmin, no tiene precio.

Cuando escribí este sobre no sabía qué decirte que no te hubiera dicho ya. Pero lo entendí: no hace falta decirte nada nuevo. Solo hace falta que sepas que aquí sigo. Que aquí estaré.

Gracias por los cien días. Por cada uno.

Para siempre tuyo,
Aiman`;

const ROULETTE_PLANS = [
  'Una cena romántica en casa con velas',
  'Maratón de películas abrazados',
  'Escribirle una carta de amor',
  'Desayuno sorpresa en la cama',
  'Bailar juntos sin música',
  'Contar estrellas desde algún sitio bonito',
  'Sesión de fotos de los dos',
  'Preparar algo rico juntos',
  'Un baño relajante con pétalos de rosa',
  'Leerle un cuento en voz alta',
  'Crear vuestra playlist de amor',
  'Ver el amanecer o el atardecer juntos',
  'Intercambiar cartas escritas a mano',
  'Sorpresa dulce sin motivo',
  'Un paseo por la orilla del mar',
];

// ── STATE ──
let _counterTimer = null;

const S = {
  section: 'home',
  settings: { start_date: '2026-06-30', her_name: 'Yasmin', your_name: 'Aiman' },
  letters: [], notes: [], poems: [], gallery: [], capsules: [], dates: [], movies: [],
  poemFilter: 'all',
  bookLetter: null,
  bookPage: 0,
  bookPages: [],
  editItem: null,
};

// ── API ──
const BACKEND = location.hostname === 'localhost' ? '' : 'https://yas-1.onrender.com';

async function api(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(BACKEND + '/api' + path, opts);
  return r.json();
}
async function apiUpload(path, formData) {
  const r = await fetch(BACKEND + '/api' + path, { method: 'POST', body: formData });
  return r.json();
}

// ── UTILS ──
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};
function fmtDate(d) {
  return new Date(d).toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' });
}
function daysTogether() {
  const diff = Math.floor((Date.now() - new Date(S.settings.start_date)) / 86400000);
  return Math.max(0, diff);
}
function timeTogether() {
  const ms = Date.now() - new Date(S.settings.start_date).getTime();
  if (ms < 0) return { days:0, hours:0, mins:0, secs:0 };
  return {
    days:  Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    mins:  Math.floor((ms % 3600000) / 60000),
    secs:  Math.floor((ms % 60000) / 1000),
  };
}
function fraseDelDia() {
  return FRASES[Math.floor(Date.now() / 86400000) % FRASES.length];
}
function typeLabel(type) {
  return { poem:'Poema', song:'Canción', story:'Historia', letter:'Carta' }[type] || type;
}
function imgSrc(item) {
  if (item.src) return BACKEND + item.src;
  return BACKEND + '/uploads/' + encodeURIComponent(item.filename || '');
}
function driveEmbedUrl(url) {
  // YouTube: watch?v=ID o youtu.be/ID o shorts/ID
  const ytM = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytM) return `https://www.youtube.com/embed/${ytM[1]}?autoplay=1&rel=0`;
  // Google Drive archivo individual: /file/d/ID  →  preview
  const fileM = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileM) return `https://drive.google.com/file/d/${fileM[1]}/preview`;
  // Google Drive carpeta
  const folderM = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderM) return `https://drive.google.com/embeddedfolderview?id=${folderM[1]}&usp=sharing#list`;
  return url;
}
function splitPages(text, maxChars = 700) {
  const paras = text.split(/\n\n+/);
  const pages = [];
  let cur = '';
  for (const p of paras) {
    if (cur && (cur + '\n\n' + p).length > maxChars) { pages.push(cur.trim()); cur = p; }
    else cur = cur ? cur + '\n\n' + p : p;
  }
  if (cur) pages.push(cur.trim());
  return pages.length ? pages : [''];
}

// ── ROUTER / NAV ──
const App = window.App = {
  async navigate(section) {
    S.section = section;
    document.querySelectorAll('.nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.section === section);
    });
    await render();
  },
  openModal(html, title) {
    $('modal-inner').innerHTML = `
      <div class="modal-handle"></div>
      ${title ? `<div class="modal-title">${title}</div>` : ''}
      ${html}
    `;
    $('modal-overlay').classList.add('open');
    $('modal').classList.add('open');
  },
  closeModal() {
    $('modal-overlay').classList.remove('open');
    $('modal').classList.remove('open');
    S.editItem = null;
  },
  openBook(letter) {
    S.bookLetter = letter;
    S.bookPage   = 0;
    S.bookPages  = letter.content ? splitPages(letter.content) : null;
    renderBook();
    $('book-overlay').classList.add('open');
  },
  closeBook()  { $('book-overlay').classList.remove('open') },
  toggleMenu() {
    const m = $('mobile-menu');
    m.classList.toggle('open');
  },
  closeMenu()  { $('mobile-menu').classList.remove('open') },
  openExp(url) { $('exp-frame').src = url.startsWith('http') ? url : BACKEND + url; $('exp-overlay').classList.add('open') },
  closeExp()   { $('exp-frame').src = ''; $('exp-overlay').classList.remove('open') },
  async openSettings() {
    const s = S.settings;
    App.openModal(`
      <div class="form-group">
        <label class="form-label">Fecha de inicio de la relación</label>
        <input class="form-input" type="date" id="s-date" value="${s.start_date}">
      </div>
      <div class="form-group">
        <label class="form-label">Su nombre</label>
        <input class="form-input" id="s-her" value="${s.her_name}">
      </div>
      <div class="form-group">
        <label class="form-label">Tu nombre</label>
        <input class="form-input" id="s-you" value="${s.your_name}">
      </div>
      <button class="btn btn-primary" style="width:100%" onclick="App.saveSettings()">Guardar</button>
    `, 'Configuración');
  },
  async saveSettings() {
    const date = $('s-date').value, her = $('s-her').value, you = $('s-you').value;
    await api('PUT', '/settings/start_date', { value: date });
    await api('PUT', '/settings/her_name',  { value: her });
    await api('PUT', '/settings/your_name', { value: you });
    S.settings = { start_date: date, her_name: her, your_name: you };
    App.closeModal();
    await render();
  },
};

// ── RENDER DISPATCHER ──
async function render() {
  if (_counterTimer) { clearInterval(_counterTimer); _counterTimer = null; }
  const c = $('content');
  c.classList.add('fade-out');
  await new Promise(r => setTimeout(r, 140));
  c.innerHTML = '';
  const fns = { home:renderHome, letters:renderLetters, notes:renderNotes, poems:renderPoems, gallery:renderGallery, barbie:renderBarbie, details:renderDetails };
  await (fns[S.section] || renderHome)();
  requestAnimationFrame(() => c.classList.remove('fade-out'));
}

// ── HOME ──
async function renderHome() {
  if (_counterTimer) { clearInterval(_counterTimer); _counterTimer = null; }

  const [notes, poems, letters] = await Promise.all([
    api('GET', '/notes'), api('GET', '/poems'), api('GET', '/letters'),
  ]);
  S.notes = notes; S.poems = poems; S.letters = letters;

  const c = $('content');
  c.innerHTML = '';

  // ── HERO CON CONTADOR EN VIVO ──
  const hero = el('div', 'home-hero anim');
  hero.innerHTML = `
    <div class="hero-petals" aria-hidden="true">
      ${Array.from({length:12},(_,i)=>`<span class="petal petal-${i+1}"></span>`).join('')}
    </div>
    <div class="hero-eyebrow">desde el 30 de junio contigo</div>
    <div class="hero-counter">
      <div class="hero-unit"><div class="hero-num" id="h-days">0</div><div class="hero-unit-label">días</div></div>
      <div class="hero-sep">·</div>
      <div class="hero-unit"><div class="hero-num" id="h-hours">00</div><div class="hero-unit-label">horas</div></div>
      <div class="hero-sep">·</div>
      <div class="hero-unit"><div class="hero-num" id="h-mins">00</div><div class="hero-unit-label">min</div></div>
      <div class="hero-sep">·</div>
      <div class="hero-unit"><div class="hero-num" id="h-secs">00</div><div class="hero-unit-label">seg</div></div>
    </div>
    <div class="hero-tagline">juntos, ${S.settings.her_name}</div>
    <div class="hero-date-line">${new Date().toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
  `;
  c.appendChild(hero);

  function tick() {
    const t = timeTogether();
    const de=$('h-days'),he=$('h-hours'),me=$('h-mins'),se=$('h-secs');
    if(de) de.textContent=t.days;
    if(he) he.textContent=String(t.hours).padStart(2,'0');
    if(me) me.textContent=String(t.mins).padStart(2,'0');
    if(se) se.textContent=String(t.secs).padStart(2,'0');
  }
  tick();
  _counterTimer = setInterval(tick, 1000);

  // ── FRASE DEL DÍA ──
  const fc = el('div', 'frase-card anim anim-d1');
  fc.innerHTML = `
    <div class="frase-label">Frase del día</div>
    <div class="frase-text">${fraseDelDia()}</div>
  `;
  c.appendChild(fc);

  // ── SOBRE DE LOS 100 DÍAS ──
  renderEnvelopeCard(c);

  // ── ACCESOS RÁPIDOS ──
  const qg = el('div', 'quick-grid anim anim-d2');
  [
    { icon:ICONS.letters, label:'Cartas',   count:`${letters.length} cartas`, section:'letters' },
    { icon:ICONS.notes,   label:'Notas',    count:`${notes.length} notas`,    section:'notes'   },
    { icon:ICONS.poems,   label:'Poemas',   count:`${poems.length} escritos`, section:'poems'   },
    { icon:ICONS.details, label:'Detalles', count:'Sorpresas',                section:'details' },
  ].forEach(q => {
    const qc = el('div', 'quick-card');
    qc.innerHTML = `<div class="qc-icon">${q.icon}</div><div class="qc-label">${q.label}</div><div class="qc-count">${q.count}</div>`;
    qc.onclick = () => App.navigate(q.section);
    qg.appendChild(qc);
  });
  c.appendChild(qg);

  // ── ÚLTIMA NOTA ──
  if (notes[0]) {
    const nc = el('div', 'note-card anim anim-d3');
    nc.innerHTML = `
      <div class="note-top">
        <div><div class="note-date">${fmtDate(notes[0].date)}</div>${notes[0].title?`<div class="note-title">${notes[0].title}</div>`:''}</div>
        <div class="note-mood">${notes[0].mood}</div>
      </div>
      <div class="note-content" style="margin-top:.5rem;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden">${notes[0].content}</div>
    `;
    nc.onclick = () => App.navigate('notes');
    c.appendChild(nc);
  }

  // ── ÚLTIMO ESCRITO ──
  if (poems[0]) {
    const pc = el('div', 'poem-card anim anim-d4');
    pc.innerHTML = `<div class="poem-type-tag">${typeLabel(poems[0].type)}</div><div class="poem-title">${poems[0].title}</div><div class="poem-preview">${poems[0].content}</div>`;
    pc.onclick = () => App.navigate('poems');
    c.appendChild(pc);
  }

  // ── RULETA ──
  const rl = el('div', 'roulette-card anim anim-d5');
  rl.innerHTML = `
    <div class="roulette-icon">${ICONS.wheel}</div>
    <div><div class="card-title" style="margin:0">Ruleta romántica</div><div class="card-sub">Gira para elegir el plan de esta noche</div></div>
  `;
  rl.onclick = openRoulette;
  c.appendChild(rl);
}

function openRoulette() {
  const plan = ROULETTE_PLANS[Math.floor(Math.random() * ROULETTE_PLANS.length)];
  App.openModal(`
    <div style="text-align:center;padding:1rem 0">
      <div style="font-family:var(--font-title);font-size:1.45rem;color:var(--rose);margin-bottom:1rem;font-style:italic">Plan para esta noche</div>
      <div style="font-family:var(--font-body);font-style:italic;font-size:1.2rem;line-height:1.7;color:var(--text);padding:1.2rem;background:var(--blush);border-radius:var(--radius);margin-bottom:1.2rem">${plan}</div>
      <div style="display:flex;gap:.7rem;justify-content:center">
        <button class="btn btn-ghost" onclick="openRoulette()">Otra vez</button>
        <button class="btn btn-primary" onclick="App.closeModal()">Este me gusta</button>
      </div>
    </div>
  `, '');
}

// ── LETTERS ──
async function renderLetters() {
  S.letters = await api('GET', '/letters');
  const c = $('content');
  c.innerHTML = '';

  c.appendChild(backBtn());
  c.appendChild(sectionTitle('Correspondencia', 'Cartas', 'Las que necesitan página entera. Ábrelas cuando tengas tiempo de quedarte un rato.'));

  const actionRow = el('div', 'sec-action-row');
  actionRow.innerHTML = `<button class="btn btn-ghost" onclick="openAddLetter()">${ICONS.plus} Añadir carta</button>`;
  c.appendChild(actionRow);

  if (!S.letters.length) { c.appendChild(emptyState('Aún no hay cartas')); return; }

  const grid = el('div', 'letter-grid');
  S.letters.forEach(l => {
    const lc = el('div', 'letter-card');
    const iconSvg = l.type === 'story'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
    lc.innerHTML = `
      <div class="letter-type-icon">${iconSvg}</div>
      <div class="letter-info">
        <div class="letter-title">${l.title}</div>
        ${l.subtitle ? `<div class="letter-sub">${l.subtitle}</div>` : ''}
      </div>
      <span class="letter-badge">${typeLabel(l.type)}</span>
    `;
    lc.onclick = () => App.openBook(l);
    grid.appendChild(lc);
  });
  c.appendChild(grid);
}

function renderBook() {
  const letter = S.bookLetter;
  const bc = $('book-container');

  if (!letter.content && letter.filename) {
    bc.innerHTML = `
      <div class="book-header"><h2>${letter.title}</h2>${letter.subtitle?`<p>${letter.subtitle}</p>`:''}</div>
      <div class="book-pages">
        <div class="pdf-view">
          <div class="pdf-icon">${ICONS.pdf}</div>
          <h3>${letter.title}</h3>
          ${letter.subtitle ? `<p>${letter.subtitle}</p>` : ''}
          <a href="${BACKEND}/love/${encodeURIComponent(letter.filename)}" target="_blank">Abrir carta</a>
        </div>
      </div>
    `;
    return;
  }

  const pages = S.bookPages;
  const page  = S.bookPage;
  const total = pages.length;
  bc.innerHTML = `
    <div class="book-header"><h2>${letter.title}</h2>${letter.subtitle?`<p>${letter.subtitle}</p>`:''}</div>
    <div class="book-pages"><div class="book-text">${(pages[page]||'').replace(/\n/g,'<br>')}</div></div>
    <div class="book-nav-row">
      <button class="book-nav-btn" onclick="bookPrev()" ${page===0?'disabled':''}>← Anterior</button>
      <span class="book-page-counter">${page+1} / ${total}</span>
      <button class="book-nav-btn" onclick="bookNext()" ${page>=total-1?'disabled':''}>Siguiente →</button>
    </div>
  `;
}

window.bookPrev = () => { if (S.bookPage > 0) { S.bookPage--; renderBook() } };
window.bookNext = () => { if (S.bookPage < S.bookPages.length-1) { S.bookPage++; renderBook() } };

function openAddLetter() {
  App.openModal(`
    <div class="form-group"><label class="form-label">Título</label><input class="form-input" id="l-title" placeholder="Título de la carta..."></div>
    <div class="form-group"><label class="form-label">Subtítulo</label><input class="form-input" id="l-sub" placeholder="Una frase bonita..."></div>
    <div class="form-group"><label class="form-label">Tipo</label>
      <select class="form-select" id="l-type"><option value="letter">Carta</option><option value="story">Historia</option></select>
    </div>
    <div class="form-group"><label class="form-label">Contenido</label><textarea class="form-textarea" id="l-content" rows="7" placeholder="Escribe aquí..."></textarea></div>
    <button class="btn btn-primary" style="width:100%" onclick="saveLetter()">Guardar carta</button>
  `, 'Nueva carta');
}

window.saveLetter = async () => {
  const data = { title:$('l-title').value.trim(), subtitle:$('l-sub').value.trim(), content:$('l-content').value.trim(), type:$('l-type').value };
  if (!data.title || !data.content) return;
  await api('POST', '/letters', data);
  App.closeModal();
  await renderLetters();
};

// ── NOTES ──
async function renderNotes() {
  [S.notes, S.gallery] = await Promise.all([api('GET', '/notes'), api('GET', '/gallery')]);
  const c = $('content');
  c.innerHTML = '';

  c.appendChild(backBtn());
  c.appendChild(sectionTitle('Día a día', 'Notas', 'Los pequeños momentos que merecen ser recordados, escritos con cuidado.'));

  // ── FOTOS & PALABRAS (flip cards) ──
  const fotos = (S.gallery || []).filter(g => g.seeded || g.seeded === 1);
  if (fotos.length) {
    const ft = el('p', 'flip-section-title');
    ft.textContent = 'Fotos & Palabras';
    c.appendChild(ft);

    const grid = el('div', 'flip-grid');
    fotos.forEach(img => {
      const card = el('div', 'flip-card');
      const inner = el('div', 'flip-card-inner');
      const front = el('div', 'flip-front');
      front.innerHTML = `
        <img src="${imgSrc(img)}" alt="${img.title}" loading="lazy">
        <div class="flip-front-overlay">
          <div class="flip-front-title">${img.title}</div>
          <div class="flip-front-hint">toca para leer</div>
        </div>`;
      const back = el('div', 'flip-back');
      back.innerHTML = `
        <div class="flip-back-title">${img.title}</div>
        <div class="flip-back-text">${img.description || ''}</div>`;
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      card.onclick = () => card.classList.toggle('flipped');
      grid.appendChild(card);
    });
    c.appendChild(grid);
    c.appendChild(el('hr', 'divider'));
  }

  const notesHead = el('p', 'flip-section-title');
  notesHead.textContent = 'Mis notas';
  c.appendChild(notesHead);

  if (!S.notes.length) {
    c.appendChild(emptyState('Aún no hay notas'));
  } else {
    const gallery = el('div', 'note-gallery');
    S.notes.forEach(n => {
      const nc = el('div', 'note-gallery-card');
      nc.innerHTML = `
        <div class="note-card-top">
          <span class="note-card-date">${fmtDate(n.date)}</span>
          <span class="note-card-mood">${n.mood || ''}</span>
        </div>
        <div class="note-card-body">
          ${n.title ? `<div class="note-card-title">${n.title}</div>` : ''}
          <div class="note-card-text">${n.content}</div>
          <div class="note-card-actions">
            <button class="btn btn-ghost" style="padding:.28rem .5rem" onclick="editNote(${n.id})">${ICONS.edit}</button>
            <button class="btn btn-danger" style="padding:.28rem .5rem" onclick="deleteNote(${n.id})">${ICONS.trash}</button>
          </div>
        </div>
      `;
      gallery.appendChild(nc);
    });
    c.appendChild(gallery);
  }

  const fab = el('button', 'fab');
  fab.innerHTML = '+';
  fab.title = 'Nueva nota';
  fab.onclick = () => openNoteForm();
  c.appendChild(fab);
}

function openNoteForm(note) {
  const today = new Date().toISOString().split('T')[0];
  const moods = ['🥰','😊','🌟','💭','😴','🌸','😢','🔥','💫','🌙'];
  const sel = (note && note.mood) || '🥰';
  App.openModal(`
    <div class="form-group"><label class="form-label">Fecha</label><input class="form-input" type="date" id="n-date" value="${note ? note.date : today}"></div>
    <div class="form-group"><label class="form-label">Título</label><input class="form-input" id="n-title" placeholder="Un título bonito…" value="${note ? note.title||'' : ''}"></div>
    <div class="form-group"><label class="form-label">Estado de ánimo</label>
      <div class="mood-row">${moods.map(m=>`<span class="mood-opt${m===sel?' selected':''}" onclick="selectMood(this,'${m}')">${m}</span>`).join('')}</div>
      <input type="hidden" id="n-mood" value="${sel}">
    </div>
    <div class="form-group"><label class="form-label">Nota</label><textarea class="form-textarea" id="n-content" placeholder="¿Qué ocurrió hoy?">${note ? note.content : ''}</textarea></div>
    <button class="btn btn-primary" style="width:100%" onclick="saveNote(${note ? note.id : 'null'})">${note ? 'Actualizar' : 'Guardar nota'}</button>
  `, note ? 'Editar nota' : 'Nueva nota');
}

window.selectMood = (el, mood) => {
  document.querySelectorAll('.mood-opt').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  $('n-mood').value = mood;
};

window.saveNote = async (id) => {
  const data = { date:$('n-date').value, title:$('n-title').value.trim(), content:$('n-content').value.trim(), mood:$('n-mood').value };
  if (!data.content) return;
  if (id) await api('PUT', `/notes/${id}`, data);
  else    await api('POST', '/notes', data);
  App.closeModal();
  await renderNotes();
};
window.editNote   = (id) => { const n = S.notes.find(n => n.id === id); if (n) openNoteForm(n) };
window.deleteNote = async (id) => {
  if (!confirm('¿Eliminar esta nota?')) return;
  await api('DELETE', `/notes/${id}`);
  await renderNotes();
};

// ── POEMS ──
async function renderPoems() {
  S.poems = await api('GET', '/poems');
  const c = $('content');
  c.innerHTML = '';
  c.appendChild(backBtn());
  c.appendChild(sectionTitle('Verso a verso', 'Poemas', 'Lo que la prosa no alcanza a decir se queda aquí, en líneas cortas.'));

  const ff = el('div', 'poem-filters');
  [{ key:'all',label:'Todos' },{ key:'poem',label:'Poemas' },{ key:'song',label:'Canciones' },{ key:'story',label:'Historias' }].forEach(f => {
    const b = el('button', `filter-btn${S.poemFilter===f.key?' active':''}`, f.label);
    b.onclick = () => { S.poemFilter = f.key; renderPoems() };
    ff.appendChild(b);
  });
  c.appendChild(ff);

  const filtered = S.poemFilter === 'all' ? S.poems : S.poems.filter(p => p.type === S.poemFilter);

  if (!filtered.length) {
    c.appendChild(emptyState('No hay escritos en esta categoría'));
  } else {
    filtered.forEach(p => {
      const pc = el('div', 'poem-card');
      pc.innerHTML = `
        <div class="flex-row" style="justify-content:space-between;margin-bottom:.5rem">
          <div class="poem-type-tag">${typeLabel(p.type)}</div>
          <div style="display:flex;gap:.35rem">
            <button class="btn btn-ghost" style="padding:.28rem .5rem" onclick="event.stopPropagation();editPoem(${p.id})">${ICONS.edit}</button>
            <button class="btn btn-danger" style="padding:.28rem .5rem" onclick="event.stopPropagation();deletePoem(${p.id})">${ICONS.trash}</button>
          </div>
        </div>
        <div class="poem-title">${p.title}</div>
        <div class="poem-preview">${p.content}</div>
      `;
      pc.onclick = () => openPoemRead(p);
      c.appendChild(pc);
    });
  }

  const fab = el('button', 'fab', '+');
  fab.onclick = () => openPoemForm();
  c.appendChild(fab);
}

function openPoemRead(p) {
  App.openModal(`
    <div style="text-align:center;margin-bottom:1rem"><span class="tag ${p.type==='song'?'tag-song':p.type==='story'?'tag-story':''}">${typeLabel(p.type)}</span></div>
    <h3 style="font-family:var(--font-title);font-size:1.45rem;color:var(--rose);text-align:center;margin-bottom:1.2rem;font-style:italic">${p.title}</h3>
    <div class="poem-full">${p.content}</div>
    <div class="card-date text-center mt-2">${fmtDate(p.created_at)}</div>
  `, '');
}

function openPoemForm(poem) {
  App.openModal(`
    <div class="form-group"><label class="form-label">Título</label><input class="form-input" id="p-title" placeholder="Título…" value="${poem ? poem.title : ''}"></div>
    <div class="form-group"><label class="form-label">Tipo</label>
      <select class="form-select" id="p-type">
        <option value="poem"  ${(!poem||poem.type==='poem' )?'selected':''}>Poema</option>
        <option value="song"  ${poem&&poem.type==='song'   ?'selected':''}>Canción</option>
        <option value="story" ${poem&&poem.type==='story'  ?'selected':''}>Historia</option>
      </select>
    </div>
    <div class="form-group"><label class="form-label">Contenido</label><textarea class="form-textarea" id="p-content" rows="9" style="min-height:200px">${poem ? poem.content : ''}</textarea></div>
    <button class="btn btn-primary" style="width:100%" onclick="savePoem(${poem ? poem.id : 'null'})">${poem ? 'Actualizar' : 'Guardar'}</button>
  `, poem ? 'Editar escrito' : 'Nuevo escrito');
}

window.savePoem = async (id) => {
  const data = { title:$('p-title').value.trim(), content:$('p-content').value.trim(), type:$('p-type').value };
  if (!data.title || !data.content) return;
  if (id) await api('PUT', `/poems/${id}`, data);
  else    await api('POST', '/poems', data);
  App.closeModal();
  await renderPoems();
};
window.editPoem   = (id) => { const p = S.poems.find(p => p.id === id); if (p) openPoemForm(p) };
window.deletePoem = async (id) => {
  if (!confirm('¿Eliminar este escrito?')) return;
  await api('DELETE', `/poems/${id}`);
  await renderPoems();
};

// ── GALLERY ──
async function renderGallery() {
  S.gallery = await api('GET', '/gallery');
  const c = $('content');
  c.innerHTML = '';
  c.appendChild(backBtn());
  c.appendChild(sectionTitle('Álbum', 'Galería', 'Pétalos, papeles y luz de tarde. Las cosas que fotografío porque me recuerdan a ti.'));

  // Upload zone
  const uz = el('label', 'gallery-upload-zone');
  uz.setAttribute('for', 'gallery-file');
  uz.innerHTML = `
    <div class="upload-icon">${ICONS.upload}</div>
    <div class="upload-text">Toca para añadir una foto</div>
    <input type="file" id="gallery-file" accept="image/*" style="display:none" onchange="handleGalleryUpload(event)">
  `;
  c.appendChild(uz);

  if (!S.gallery.length) { c.appendChild(emptyState('La galería está esperando tus fotos')); return; }

  const grid = el('div', 'gallery-grid');
  S.gallery.forEach(img => {
    const item = el('div', 'gallery-item');
    item.innerHTML = `
      <img src="${imgSrc(img)}" alt="${img.title||''}" loading="lazy">
      <div class="gallery-cap"><div class="gallery-cap-title">${img.title || ''}</div></div>
    `;
    item.onclick = () => openGalleryItem(img);
    grid.appendChild(item);
  });
  c.appendChild(grid);
}

window.handleGalleryUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  App.openModal(`
    <div style="text-align:center;margin-bottom:1rem">
      <img src="${URL.createObjectURL(file)}" style="max-height:200px;border-radius:var(--radius);object-fit:cover;width:100%">
    </div>
    <div class="form-group"><label class="form-label">Título</label><input class="form-input" id="gi-title" placeholder="Título de la foto…"></div>
    <div class="form-group"><label class="form-label">Descripción</label><textarea class="form-textarea" id="gi-desc" rows="4" placeholder="Escribe algo sobre este momento…"></textarea></div>
    <button class="btn btn-primary" style="width:100%" onclick="uploadGalleryImg()">Guardar foto</button>
  `, 'Nueva foto');
  window._pendingFile = file;
};

window.uploadGalleryImg = async () => {
  const file = window._pendingFile;
  if (!file) return;
  const fd = new FormData();
  fd.append('image', file);
  fd.append('title', $('gi-title').value.trim());
  fd.append('description', $('gi-desc').value.trim());
  await apiUpload('/gallery', fd);
  App.closeModal();
  await renderGallery();
};

function openGalleryItem(img) {
  App.openModal(`
    <img src="${imgSrc(img)}" style="width:100%;border-radius:var(--radius-sm);margin-bottom:1rem;object-fit:cover;max-height:300px">
    ${img.title ? `<h3 style="font-family:var(--font-title);font-size:1.3rem;color:var(--rose);margin-bottom:.6rem;font-style:italic">${img.title}</h3>` : ''}
    ${img.description ? `<p style="font-family:var(--font-body);font-style:italic;line-height:1.75;color:var(--text)">${img.description}</p>` : ''}
    <div class="card-date mt-2">${fmtDate(img.created_at)}</div>
    ${!img.seeded ? `<div class="card-actions mt-2"><button class="btn btn-danger" onclick="deleteGalleryImg(${img.id})">${ICONS.trash} Eliminar</button></div>` : ''}
  `, '');
}

window.deleteGalleryImg = async (id) => {
  if (!confirm('¿Eliminar esta foto?')) return;
  await api('DELETE', `/gallery/${id}`);
  App.closeModal();
  await renderGallery();
};

// ── BARBIE ──
async function renderBarbie() {
  S.movies = await api('GET', '/movies');
  const c = $('content');
  c.innerHTML = '';
  c.appendChild(backBtn());

  c.appendChild(sectionTitle('Tu color favorito', 'Barbie', 'Tu lado rosa, sin pedir permiso: lazos, perlas, brillo y ese gusto tan tuyo por lo bonito.'));

  const actionRow = el('div', 'sec-action-row');
  actionRow.innerHTML = `<button class="btn btn-primary" onclick="openMovieForm()">${ICONS.plus} Añadir película</button>`;
  c.appendChild(actionRow);

  if (!S.movies.length) {
    const empty = el('div', 'barbie-empty');
    empty.innerHTML = `
      <p style="text-align:center;font-family:var(--font-body);font-style:italic;color:var(--text-muted);margin-bottom:1rem">
        Añade películas pegando el enlace de Google Drive.<br>
        En Drive: clic derecho en el vídeo → Compartir → Copiar enlace.
      </p>
    `;
    c.appendChild(empty);
    return;
  }

  const grid = el('div', 'movies-grid');
  S.movies.forEach(m => {
    const card = el('div', 'movie-card');
    card.innerHTML = `
      <div class="movie-poster">
        <div class="movie-play">${ICONS.play}</div>
      </div>
      <div class="movie-info">
        <div class="movie-title">${m.title}</div>
        ${m.description ? `<div class="movie-desc">${m.description}</div>` : ''}
      </div>
    `;
    card.onclick = () => App.openExp(driveEmbedUrl(m.drive_url));

    // Long press / right-click to edit
    let pressTimer;
    card.addEventListener('touchstart', () => { pressTimer = setTimeout(() => openMovieForm(m), 600) });
    card.addEventListener('touchend',   () => clearTimeout(pressTimer));
    card.addEventListener('contextmenu', e => { e.preventDefault(); openMovieForm(m) });

    grid.appendChild(card);
  });
  c.appendChild(grid);

  const hint = el('p', '');
  hint.style.cssText = 'text-align:center;font-size:.75rem;color:var(--text-muted);margin-top:1rem;font-style:italic';
  hint.textContent = 'Mantén pulsada una película para editarla';
  c.appendChild(hint);
}

window.openMovieForm = (movie) => {
  S.editItem = movie || null;
  App.openModal(`
    <div class="form-group"><label class="form-label">Nombre de la película</label><input class="form-input" id="mv-title" value="${movie?.title || ''}" placeholder="Barbie (2023)…"></div>
    <div class="form-group">
      <label class="form-label">Enlace de YouTube o Google Drive</label>
      <input class="form-input" id="mv-url" value="${movie?.drive_url || ''}" placeholder="https://youtube.com/watch?v=… o drive.google.com/…">
      <small style="color:var(--text-muted);font-size:.74rem;margin-top:.3rem;display:block">Pega el enlace de YouTube o de Google Drive</small>
    </div>
    <div class="form-group"><label class="form-label">Descripción (opcional)</label><textarea class="form-textarea" id="mv-desc" rows="2" placeholder="Un apunte sobre esta peli…">${movie?.description || ''}</textarea></div>
    <div style="display:flex;gap:.6rem">
      ${movie ? `<button class="btn btn-danger" onclick="deleteMovie(${movie.id})">${ICONS.trash}</button>` : ''}
      <button class="btn btn-primary" style="flex:1" onclick="saveMovie()">Guardar</button>
    </div>
  `, movie ? 'Editar película' : 'Nueva película');
};

window.saveMovie = async () => {
  const title = $('mv-title').value.trim();
  const url   = $('mv-url').value.trim();
  const desc  = $('mv-desc').value.trim();
  if (!title || !url) return;
  if (S.editItem) await api('PUT', `/movies/${S.editItem.id}`, { title, drive_url:url, description:desc });
  else            await api('POST', '/movies', { title, drive_url:url, description:desc });
  App.closeModal();
  await renderBarbie();
};

window.deleteMovie = async (id) => {
  if (!confirm('¿Eliminar esta película?')) return;
  await api('DELETE', `/movies/${id}`);
  App.closeModal();
  await renderBarbie();
};

// ── DETAILS ──
async function renderDetails() {
  const c = $('content');
  c.innerHTML = '';
  c.appendChild(backBtn());
  c.appendChild(sectionTitle('Para ti', 'Detalles', 'Cada experiencia fue creada con amor, una por una, solo para Yasmin.'));

  EXPERIENCES.forEach(exp => {
    const ec = el('div', 'exp-card');
    ec.innerHTML = `
      <div class="exp-icon">${EXP_ICONS[exp.icon] || ICONS.details}</div>
      <div class="exp-info">
        <div class="exp-title">${exp.title}</div>
        <div class="exp-desc">${exp.desc}</div>
      </div>
      <button class="exp-launch" onclick="event.stopPropagation();App.openExp('${exp.url}')">Lanzar</button>
    `;
    ec.onclick = () => App.openExp(exp.url);
    c.appendChild(ec);
  });

  // Roulette
  const rl = el('div', 'exp-card');
  rl.style.cssText = 'cursor:pointer;background:linear-gradient(135deg,#1a0520,#2d0a30)';
  rl.innerHTML = `
    <div class="exp-icon">${ICONS.wheel}</div>
    <div class="exp-info"><div class="exp-title">Ruleta romántica</div><div class="exp-desc">Gira para elegir qué plan romántico hacer esta noche</div></div>
    <button class="exp-launch" onclick="event.stopPropagation();openRoulette()">Girar</button>
  `;
  rl.onclick = openRoulette;
  c.appendChild(rl);
}

// ── SOBRE DE LOS 100 DÍAS ──
function renderEnvelopeCard(c) {
  const start    = new Date(S.settings.start_date);
  const day100   = new Date(start.getTime() + 100 * 86400000);
  const daysLeft = Math.ceil((day100 - Date.now()) / 86400000);
  const isOpen   = daysLeft <= 0;

  const card = el('div', `envelope-card anim anim-d1${isOpen ? ' envelope-open' : ''}`);
  const dateStr = day100.toLocaleDateString('es-ES', { day:'numeric', month:'long' });

  card.innerHTML = `
    <div class="envelope-icon">${ICONS.letters}</div>
    <div class="envelope-body">
      <div class="envelope-title">El sobre de los 100 días</div>
      <div class="envelope-sub">${isOpen
        ? 'Ha llegado el momento. Ábrelo.'
        : `Se abre el <strong>${dateStr}</strong> · Faltan <strong>${daysLeft}</strong> días`}
      </div>
    </div>
    <span class="envelope-badge ${isOpen ? 'badge-open' : 'badge-locked'}">${isOpen ? 'Abierto' : 'Cerrado'}</span>
  `;

  if (isOpen) {
    card.onclick = () => App.openModal(`
      <div style="text-align:center;margin-bottom:1.2rem">
        <div style="font-size:1.5rem;margin-bottom:.5rem">${ICONS.letters.replace('viewBox','style="width:36px;height:36px;stroke:var(--rose)" viewBox')}</div>
        <h3 style="font-family:var(--font-title);font-size:1.6rem;color:var(--rose);font-style:italic">100 días</h3>
      </div>
      <div style="font-family:var(--font-body);font-size:1.05rem;line-height:2;color:var(--text);white-space:pre-wrap;font-style:italic">${SOBRE_100}</div>
    `, '');
  }
  c.appendChild(card);
}

// ── LLUVIA DE CORAZONES (easter egg) ──
function triggerHeartRain() {
  const container = document.createElement('div');
  container.className = 'heart-rain';
  document.body.appendChild(container);
  const shapes = ['♥','♥','♡','❤'];
  const colors = ['#C2185B','#E91E8C','#F06292','#880E4F','#F48FB1'];
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.className = 'falling-heart';
      h.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      h.style.left = (Math.random() * 96) + 'vw';
      h.style.color = colors[Math.floor(Math.random() * colors.length)];
      h.style.fontSize = (0.9 + Math.random() * 1.4) + 'rem';
      h.style.animationDuration = (1.8 + Math.random() * 2.2) + 's';
      h.style.animationDelay = '0s';
      container.appendChild(h);
      h.addEventListener('animationend', () => h.remove());
    }, i * 70);
  }
  setTimeout(() => container.remove(), 6000);
}

// ── HELPERS ──
function sectionTitle(eyebrow, title, desc) {
  const w = el('div', 'sec-title-wrap anim');
  w.innerHTML = `
    <p class="sec-eyebrow">${eyebrow}</p>
    <h2 class="sec-title">${title}</h2>
    <div class="sec-line"></div>
    ${desc ? `<p class="sec-desc">${desc}</p>` : ''}
  `;
  return w;
}
function backBtn() {
  const b = el('button', 'back-btn anim');
  b.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg> Inicio`;
  b.onclick = () => App.navigate('home');
  return b;
}
function emptyState(text) {
  const d = el('div', 'empty-state');
  d.innerHTML = `<div class="empty-icon">${ICONS.poems}</div><div class="empty-text">${text}</div>`;
  return d;
}

// ── SPLASH ──
function dismissSplash() {
  const s = $('splash');
  if (!s || s.classList.contains('out')) return;
  s.classList.add('out');
  setTimeout(() => s?.remove(), 950);
}

// ── INIT ──
async function init() {
  // Auto-dismiss splash after 2.4s
  setTimeout(dismissSplash, 2400);

  try {
    const settings = await api('GET', '/settings');
    if (settings) S.settings = { ...S.settings, ...settings };
  } catch (_) {}

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = () => { App.navigate(btn.dataset.section); App.closeMenu(); };
  });

  // Easter egg: triple-tap en el logo → lluvia de corazones
  let _logoTaps = 0, _logoTimer;
  const logoEl = document.querySelector('.logo');
  if (logoEl) {
    logoEl.addEventListener('click', () => {
      _logoTaps++;
      clearTimeout(_logoTimer);
      _logoTimer = setTimeout(() => { _logoTaps = 0; }, 550);
      if (_logoTaps >= 3) { _logoTaps = 0; triggerHeartRain(); }
    });
  }

  await App.navigate('home');
}

init();
