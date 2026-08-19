/* ── YASMIN APP ♥ ── */

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
  {
    icon: '👁️', title: 'La Linterna de Yasmin',
    desc: 'Mueve la luz por la oscuridad y descubre las palabras escondidas en su mirada',
    url: '/experience/linterna'
  },
  {
    icon: '🪞', title: 'El Espejo Empañado',
    desc: 'Pasa el dedo por el espejo y descubre los mensajes ocultos bajo el vaho',
    url: '/experience/espejo'
  },
  {
    icon: '🌙', title: 'Buenas Noches, Yasmin',
    desc: 'Toca las estrellas en el cielo nocturno y descubre los pensamientos secretos',
    url: '/experience/estrellas'
  },
  {
    icon: '🎈', title: 'Los Globos de Colores',
    desc: 'Revienta los globos uno a uno y descubre las palabras que te describen',
    url: '/experience/globos'
  },
  {
    icon: '📖', title: 'Las Mil Maneras en que me Amas',
    desc: 'Un libro antiguo con todas las formas en que su amor se manifiesta cada día',
    url: '/experience/libro'
  },
];

const ROULETTE_PLANS = [
  '🌙 Una cena romántica en casa con velas',
  '🎬 Maraton de películas abrazados',
  '🌹 Escribirle una carta de amor',
  '☕ Desayuno sorpresa en la cama',
  '💃 Bailar juntos sin música',
  '⭐ Contar estrellas desde algún sitio bonito',
  '📸 Sesión de fotos de los dos',
  '🍓 Preparar algo rico juntos',
  '🛁 Un baño relajante con pétalos de rosa',
  '📖 Leerle un cuento en voz alta',
  '🎵 Crear vuestra playlist de amor',
  '🌅 Ver el amanecer o el atardecer juntos',
  '💌 Intercambiar cartas escritas a mano',
  '🎂 Sorpresa dulce sin motivo',
  '🌊 Un paseo por la orilla del mar',
];

// ── STATE ──
const S = {
  section: 'home',
  settings: { start_date: '2026-07-01', her_name: 'Yasmin', your_name: 'Aiman' },
  letters: [], notes: [], poems: [], gallery: [], capsules: [], dates: [],
  poemFilter: 'all',
  bookLetter: null,
  bookPage: 0,
  bookPages: [],
  editItem: null,
};

// ── API ──
async function api(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch('/api' + path, opts);
  return r.json();
}
async function apiUpload(path, formData) {
  const r = await fetch('/api' + path, { method: 'POST', body: formData });
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
  const opt = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(d).toLocaleDateString('es-ES', opt);
}
function daysTogether() {
  const start = new Date(S.settings.start_date);
  const diff  = Math.floor((Date.now() - start) / 86400000);
  return Math.max(0, diff);
}
function fraseDelDia() {
  const idx = Math.floor(Date.now() / 86400000) % FRASES.length;
  return FRASES[idx];
}
function typeLabel(type) {
  return { poem:'Poema', song:'Canción', story:'Historia', letter:'Carta' }[type] || type;
}
function typeIcon(type) {
  return type === 'story' ? '📖' : type === 'song' ? '🎵' : '💌';
}
function splitPages(text, maxChars = 700) {
  const paras = text.split(/\n\n+/);
  const pages = [];
  let cur = '';
  for (const p of paras) {
    if (cur && (cur + '\n\n' + p).length > maxChars) {
      pages.push(cur.trim());
      cur = p;
    } else {
      cur = cur ? cur + '\n\n' + p : p;
    }
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
      <div class="modal-title">${title}</div>
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
    S.bookPage = 0;
    if (letter.content) {
      S.bookPages = splitPages(letter.content);
    } else {
      S.bookPages = null;
    }
    renderBook();
    $('book-overlay').classList.add('open');
  },
  closeBook() {
    $('book-overlay').classList.remove('open');
  },
  openExp(url) {
    $('exp-frame').src = url;
    $('exp-overlay').classList.add('open');
  },
  closeExp() {
    $('exp-frame').src = '';
    $('exp-overlay').classList.remove('open');
  },
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
    `, '⚙️ Configuración');
  },
  async saveSettings() {
    const date = $('s-date').value;
    const her  = $('s-her').value;
    const you  = $('s-you').value;
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
  const c = $('content');
  c.innerHTML = '<div class="loading">✦ cargando…</div>';

  const fns = {
    home:    renderHome,
    letters: renderLetters,
    notes:   renderNotes,
    poems:   renderPoems,
    gallery: renderGallery,
    details: renderDetails,
  };
  await (fns[S.section] || renderHome)();
}

// ── HOME ──
async function renderHome() {
  const [notes, poems, letters] = await Promise.all([
    api('GET', '/notes'),
    api('GET', '/poems'),
    api('GET', '/letters'),
  ]);
  S.notes = notes; S.poems = poems; S.letters = letters;

  const days = daysTogether();
  const frase = fraseDelDia();
  const lastNote = notes[0];
  const lastPoem = poems[0];

  const c = $('content');
  c.innerHTML = '';

  // Hero
  const hero = el('div', 'home-hero');
  hero.innerHTML = `
    <div class="hero-days">${days}</div>
    <div class="hero-label">días juntos con ${S.settings.her_name} ♥</div>
    <div class="hero-date">${new Date().toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
  `;
  c.appendChild(hero);

  // Frase del día
  const fc = el('div', 'frase-card');
  fc.innerHTML = `
    <div class="frase-label">✦ Frase del día ✦</div>
    <div class="frase-text">"${frase}"</div>
  `;
  c.appendChild(fc);

  // Quick access
  const qg = el('div', 'quick-grid');
  const qItems = [
    { icon:'💌', label:'Cartas', count:`${letters.length} cartas`, section:'letters' },
    { icon:'📝', label:'Notas', count:`${notes.length} notas`, section:'notes' },
    { icon:'🌸', label:'Poemas', count:`${poems.length} escritos`, section:'poems' },
    { icon:'✨', label:'Detalles', count:'Juegos & sorpresas', section:'details' },
  ];
  qItems.forEach(q => {
    const qc = el('div', 'quick-card');
    qc.innerHTML = `<div class="qc-icon">${q.icon}</div><div class="qc-label">${q.label}</div><div class="qc-count">${q.count}</div>`;
    qc.onclick = () => App.navigate(q.section);
    qg.appendChild(qc);
  });
  c.appendChild(qg);

  // Last note
  if (lastNote) {
    const h = el('h3', '', 'Última nota ✍️');
    h.style.cssText = 'font-family:var(--font-title);color:var(--rose);margin-bottom:.7rem;font-size:1.2rem';
    c.appendChild(h);
    const nc = el('div', 'note-card');
    nc.innerHTML = `
      <div class="note-top">
        <div>
          <div class="note-date">${fmtDate(lastNote.date)}</div>
          ${lastNote.title ? `<div class="note-title">${lastNote.title}</div>` : ''}
        </div>
        <div class="note-mood">${lastNote.mood}</div>
      </div>
      <div class="note-content" style="margin-top:.5rem;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden">${lastNote.content}</div>
    `;
    nc.onclick = () => App.navigate('notes');
    c.appendChild(nc);
  }

  // Last poem
  if (lastPoem) {
    const h2 = el('h3', '', 'Último escrito 🌸');
    h2.style.cssText = 'font-family:var(--font-title);color:var(--rose);margin:.9rem 0 .7rem;font-size:1.2rem';
    c.appendChild(h2);
    const pc = el('div', 'poem-card');
    pc.innerHTML = `
      <div class="poem-type-tag">${typeLabel(lastPoem.type)}</div>
      <div class="poem-title">${lastPoem.title}</div>
      <div class="poem-preview">${lastPoem.content}</div>
    `;
    pc.onclick = () => App.navigate('poems');
    c.appendChild(pc);
  }

  // Roulette teaser
  const rl = el('div', 'card mt-2');
  rl.style.cssText += ';cursor:pointer;background:linear-gradient(135deg,#fff0f8,#fff)';
  rl.innerHTML = `
    <div style="display:flex;align-items:center;gap:.8rem">
      <span style="font-size:2rem">🎡</span>
      <div>
        <div class="card-title" style="margin:0">Ruleta romántica</div>
        <div class="card-sub">Gira para elegir el plan de esta noche</div>
      </div>
    </div>
  `;
  rl.onclick = openRoulette;
  c.appendChild(rl);
}

function openRoulette() {
  const idx = Math.floor(Math.random() * ROULETTE_PLANS.length);
  App.openModal(`
    <div style="text-align:center;padding:1rem 0">
      <div style="font-size:4rem;margin-bottom:.8rem;animation:hpulse 1s ease-in-out infinite">🎡</div>
      <div style="font-family:var(--font-title);font-size:1.5rem;color:var(--rose);margin-bottom:.5rem">Plan para hoy</div>
      <div style="font-family:var(--font-body);font-style:italic;font-size:1.2rem;line-height:1.6;color:var(--text);padding:1rem;background:var(--rose-pale);border-radius:var(--radius);margin-bottom:1rem">
        ${ROULETTE_PLANS[idx]}
      </div>
      <div style="display:flex;gap:.7rem;justify-content:center">
        <button class="btn btn-ghost" onclick="openRoulette()">🔄 Otra vez</button>
        <button class="btn btn-primary" onclick="App.closeModal()">♥ Este me gusta</button>
      </div>
    </div>
  `, '');
}

// ── LETTERS ──
async function renderLetters() {
  S.letters = await api('GET', '/letters');
  const c = $('content');
  c.innerHTML = '';

  const head = el('div', 'section-head');
  head.innerHTML = `<h2>💌 Cartas & Escritos</h2>
    <button class="btn btn-ghost" onclick="openAddLetter()">+ Añadir</button>`;
  c.appendChild(head);

  const desc = el('p', 'section-desc');
  desc.textContent = 'Cada carta es un pedazo de corazón puesto en palabras.';
  c.appendChild(desc);

  if (!S.letters.length) {
    c.appendChild(emptyState('💌', 'No hay cartas aún'));
    return;
  }

  const grid = el('div', 'letter-grid');
  S.letters.forEach(l => {
    const lc = el('div', 'letter-card');
    lc.innerHTML = `
      <div class="letter-type-icon">${typeIcon(l.type)}</div>
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
      <div class="book-header">
        <h2>${letter.title}</h2>
        ${letter.subtitle ? `<p>${letter.subtitle}</p>` : ''}
      </div>
      <div class="book-pages">
        <div class="pdf-view">
          <div class="pdf-icon">📄</div>
          <h3>${letter.title}</h3>
          ${letter.subtitle ? `<p>${letter.subtitle}</p>` : ''}
          <a href="/love/${encodeURIComponent(letter.filename)}" target="_blank">Abrir carta ↗</a>
        </div>
      </div>
    `;
    return;
  }

  const pages = S.bookPages;
  const page  = S.bookPage;
  const total = pages.length;

  bc.innerHTML = `
    <div class="book-header">
      <h2>${letter.title}</h2>
      ${letter.subtitle ? `<p>${letter.subtitle}</p>` : ''}
    </div>
    <div class="book-pages">
      <div class="book-text">${pages[page] ? pages[page].replace(/\n/g,'<br>') : ''}</div>
    </div>
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
    <div class="form-group">
      <label class="form-label">Título</label>
      <input class="form-input" id="l-title" placeholder="Título de la carta...">
    </div>
    <div class="form-group">
      <label class="form-label">Subtítulo (opcional)</label>
      <input class="form-input" id="l-sub" placeholder="Una frase bonita...">
    </div>
    <div class="form-group">
      <label class="form-label">Tipo</label>
      <select class="form-select" id="l-type">
        <option value="letter">Carta</option>
        <option value="story">Historia</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Contenido</label>
      <textarea class="form-textarea" id="l-content" rows="7" placeholder="Escribe aquí..."></textarea>
    </div>
    <button class="btn btn-primary" style="width:100%" onclick="saveLetter()">Guardar carta</button>
  `, '💌 Nueva carta');
}

window.saveLetter = async () => {
  const data = {
    title: $('l-title').value.trim(),
    subtitle: $('l-sub').value.trim(),
    content: $('l-content').value.trim(),
    type: $('l-type').value,
  };
  if (!data.title || !data.content) return;
  await api('POST', '/letters', data);
  App.closeModal();
  await renderLetters();
};

// ── NOTES ──
async function renderNotes() {
  S.notes = await api('GET', '/notes');
  const c = $('content');
  c.innerHTML = '';

  const head = el('div', 'section-head');
  head.innerHTML = `<h2>📝 Notas diarias</h2>`;
  c.appendChild(head);

  const desc = el('p', 'section-desc');
  desc.textContent = 'Los pequeños momentos del día a día que merecen ser recordados.';
  c.appendChild(desc);

  if (!S.notes.length) {
    c.appendChild(emptyState('📝', 'No hay notas todavía'));
  } else {
    S.notes.forEach(n => {
      const nc = el('div', 'note-card');
      nc.innerHTML = `
        <div class="note-top">
          <div>
            <div class="note-date">${fmtDate(n.date)}</div>
            ${n.title ? `<div class="note-title">${n.title}</div>` : ''}
          </div>
          <div>
            <div class="note-mood">${n.mood}</div>
            <div class="card-actions" style="margin-top:.5rem">
              <button class="btn btn-ghost" style="padding:.3rem .6rem;font-size:.8rem" onclick="editNote(${n.id})">✏️</button>
              <button class="btn btn-danger" style="padding:.3rem .6rem;font-size:.8rem" onclick="deleteNote(${n.id})">🗑</button>
            </div>
          </div>
        </div>
        <div class="note-content" style="margin-top:.5rem">${n.content}</div>
      `;
      c.appendChild(nc);
    });
  }

  // FAB
  const fab = el('button', 'fab');
  fab.innerHTML = '+';
  fab.title = 'Nueva nota';
  fab.onclick = () => openNoteForm();
  c.appendChild(fab);
}

function openNoteForm(note) {
  const today = new Date().toISOString().split('T')[0];
  const moods = ['🥰','😊','🌟','💭','😴','🌸','😢','🔥','💫','🌙'];
  const sel   = (note && note.mood) || '🥰';
  App.openModal(`
    <div class="form-group">
      <label class="form-label">Fecha</label>
      <input class="form-input" type="date" id="n-date" value="${note ? note.date : today}">
    </div>
    <div class="form-group">
      <label class="form-label">Título (opcional)</label>
      <input class="form-input" id="n-title" placeholder="Un título bonito…" value="${note ? note.title||'' : ''}">
    </div>
    <div class="form-group">
      <label class="form-label">Estado de ánimo</label>
      <div class="mood-row">
        ${moods.map(m => `<span class="mood-opt${m===sel?' selected':''}" onclick="selectMood(this,'${m}')">${m}</span>`).join('')}
      </div>
      <input type="hidden" id="n-mood" value="${sel}">
    </div>
    <div class="form-group">
      <label class="form-label">Nota</label>
      <textarea class="form-textarea" id="n-content" placeholder="¿Qué ocurrió hoy?">${note ? note.content : ''}</textarea>
    </div>
    <button class="btn btn-primary" style="width:100%" onclick="saveNote(${note ? note.id : 'null'})">
      ${note ? 'Actualizar' : 'Guardar nota'}
    </button>
  `, note ? '✏️ Editar nota' : '📝 Nueva nota');
}

window.selectMood = (el, mood) => {
  document.querySelectorAll('.mood-opt').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  $('n-mood').value = mood;
};

window.saveNote = async (id) => {
  const data = {
    date: $('n-date').value,
    title: $('n-title').value.trim(),
    content: $('n-content').value.trim(),
    mood: $('n-mood').value,
  };
  if (!data.content) return;
  if (id) await api('PUT', `/notes/${id}`, data);
  else    await api('POST', '/notes', data);
  App.closeModal();
  await renderNotes();
};

window.editNote = async (id) => {
  const note = S.notes.find(n => n.id === id);
  if (note) openNoteForm(note);
};

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

  const head = el('div', 'section-head');
  head.innerHTML = `<h2>🌸 Poemas & Canciones</h2>`;
  c.appendChild(head);

  const desc = el('p', 'section-desc');
  desc.textContent = 'Palabras que nacen del corazón para llegar a las manos de Yasmin.';
  c.appendChild(desc);

  // Filters
  const ff = el('div', 'poem-filters');
  const filters = [
    { key:'all', label:'Todos' },
    { key:'poem', label:'Poemas' },
    { key:'song', label:'Canciones' },
    { key:'story', label:'Historias' },
  ];
  filters.forEach(f => {
    const b = el('button', `filter-btn${S.poemFilter===f.key?' active':''}`, f.label);
    b.onclick = () => { S.poemFilter = f.key; renderPoems() };
    ff.appendChild(b);
  });
  c.appendChild(ff);

  const filtered = S.poemFilter === 'all'
    ? S.poems
    : S.poems.filter(p => p.type === S.poemFilter);

  if (!filtered.length) {
    c.appendChild(emptyState('🌸', 'No hay escritos en esta categoría'));
  } else {
    filtered.forEach(p => {
      const pc = el('div', 'poem-card');
      pc.innerHTML = `
        <div class="flex-row" style="justify-content:space-between;margin-bottom:.5rem">
          <div class="poem-type-tag">${typeLabel(p.type)}</div>
          <div style="display:flex;gap:.4rem">
            <button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.78rem" onclick="event.stopPropagation();editPoem(${p.id})">✏️</button>
            <button class="btn btn-danger" style="padding:.25rem .5rem;font-size:.78rem" onclick="event.stopPropagation();deletePoem(${p.id})">🗑</button>
          </div>
        </div>
        <div class="poem-title">${p.title}</div>
        <div class="poem-preview">${p.content}</div>
      `;
      pc.onclick = () => openPoemRead(p);
      c.appendChild(pc);
    });
  }

  // FAB
  const fab = el('button', 'fab');
  fab.innerHTML = '+';
  fab.onclick = () => openPoemForm();
  c.appendChild(fab);
}

function openPoemRead(p) {
  App.openModal(`
    <div style="text-align:center;margin-bottom:1rem">
      <span class="tag ${p.type==='song'?'tag-song':p.type==='story'?'tag-story':''}">${typeLabel(p.type)}</span>
    </div>
    <h3 style="font-family:var(--font-title);font-size:1.5rem;color:var(--rose);text-align:center;margin-bottom:1.2rem">${p.title}</h3>
    <div class="poem-full">${p.content}</div>
    <div class="card-date text-center mt-2">${fmtDate(p.created_at)}</div>
  `, '');
}

function openPoemForm(poem) {
  App.openModal(`
    <div class="form-group">
      <label class="form-label">Título</label>
      <input class="form-input" id="p-title" placeholder="Título…" value="${poem ? poem.title : ''}">
    </div>
    <div class="form-group">
      <label class="form-label">Tipo</label>
      <select class="form-select" id="p-type">
        <option value="poem"  ${(!poem||poem.type==='poem' )?'selected':''}>Poema</option>
        <option value="song"  ${poem&&poem.type==='song'  ?'selected':''}>Canción</option>
        <option value="story" ${poem&&poem.type==='story' ?'selected':''}>Historia</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Contenido</label>
      <textarea class="form-textarea" id="p-content" rows="9" style="min-height:200px">${poem ? poem.content : ''}</textarea>
    </div>
    <button class="btn btn-primary" style="width:100%" onclick="savePoem(${poem ? poem.id : 'null'})">
      ${poem ? 'Actualizar' : 'Guardar'}
    </button>
  `, poem ? '✏️ Editar' : '🌸 Nuevo escrito');
}

window.savePoem = async (id) => {
  const data = {
    title:   $('p-title').value.trim(),
    content: $('p-content').value.trim(),
    type:    $('p-type').value,
  };
  if (!data.title || !data.content) return;
  if (id) await api('PUT', `/poems/${id}`, data);
  else    await api('POST', '/poems', data);
  App.closeModal();
  await renderPoems();
};

window.editPoem = (id) => {
  const p = S.poems.find(p => p.id === id);
  if (p) openPoemForm(p);
};

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

  const head = el('div', 'section-head');
  head.innerHTML = `<h2>📷 Galería</h2>`;
  c.appendChild(head);

  const desc = el('p', 'section-desc');
  desc.textContent = 'Momentos guardados para siempre, con las palabras que les dan vida.';
  c.appendChild(desc);

  // Upload zone
  const uz = el('label', 'gallery-upload-zone');
  uz.setAttribute('for', 'gallery-file');
  uz.innerHTML = `
    <div class="upload-icon">📸</div>
    <div class="upload-text">Toca para añadir una foto</div>
    <input type="file" id="gallery-file" accept="image/*" style="display:none" onchange="handleGalleryUpload(event)">
  `;
  c.appendChild(uz);

  if (!S.gallery.length) {
    c.appendChild(emptyState('🌸', 'La galería está esperando tus fotos'));
    return;
  }

  const grid = el('div', 'gallery-grid');
  S.gallery.forEach(img => {
    const item = el('div', 'gallery-item');
    item.innerHTML = `
      <img src="/uploads/${encodeURIComponent(img.filename)}" alt="${img.title||''}" loading="lazy">
      <div class="gallery-cap">
        <div class="gallery-cap-title">${img.title || ''}</div>
      </div>
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
    <div class="form-group">
      <label class="form-label">Título</label>
      <input class="form-input" id="gi-title" placeholder="Título de la foto…">
    </div>
    <div class="form-group">
      <label class="form-label">Descripción bonita ✍️</label>
      <textarea class="form-textarea" id="gi-desc" rows="4" placeholder="Escribe algo sobre este momento…"></textarea>
    </div>
    <button class="btn btn-primary" style="width:100%" onclick="uploadGalleryImg()">Guardar foto</button>
  `, '📷 Nueva foto');
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
    <img src="/uploads/${encodeURIComponent(img.filename)}" style="width:100%;border-radius:var(--radius-sm);margin-bottom:1rem;object-fit:cover;max-height:280px">
    ${img.title ? `<h3 style="font-family:var(--font-title);font-size:1.3rem;color:var(--rose);margin-bottom:.5rem">${img.title}</h3>` : ''}
    ${img.description ? `<p style="font-family:var(--font-body);font-style:italic;line-height:1.7;color:var(--text)">${img.description}</p>` : ''}
    <div class="card-date mt-2">${fmtDate(img.created_at)}</div>
    <div class="card-actions mt-2">
      <button class="btn btn-danger" onclick="deleteGalleryImg(${img.id})">🗑 Eliminar</button>
    </div>
  `, '');
}

window.deleteGalleryImg = async (id) => {
  if (!confirm('¿Eliminar esta foto?')) return;
  await api('DELETE', `/gallery/${id}`);
  App.closeModal();
  await renderGallery();
};

// ── DETAILS ──
async function renderDetails() {
  const c = $('content');
  c.innerHTML = '';

  const head = el('div', 'section-head');
  head.innerHTML = `<h2>✨ Detalles & Sorpresas</h2>`;
  c.appendChild(head);

  const desc = el('p', 'section-desc');
  desc.textContent = 'Cada experiencia fue creada con amor, una por una, solo para Yasmin.';
  c.appendChild(desc);

  EXPERIENCES.forEach(exp => {
    const ec = el('div', 'exp-card');
    ec.innerHTML = `
      <div class="exp-icon">${exp.icon}</div>
      <div class="exp-info">
        <div class="exp-title">${exp.title}</div>
        <div class="exp-desc">${exp.desc}</div>
      </div>
      <button class="exp-launch" onclick="event.stopPropagation();App.openExp('${exp.url}')">Lanzar ✨</button>
    `;
    ec.onclick = () => App.openExp(exp.url);
    c.appendChild(ec);
  });

  // Roulette
  const rl = el('div', 'exp-card');
  rl.style.cssText = 'cursor:pointer;background:linear-gradient(135deg,#1a0520,#2d0a30)';
  rl.innerHTML = `
    <div class="exp-icon">🎡</div>
    <div class="exp-info">
      <div class="exp-title">Ruleta romántica</div>
      <div class="exp-desc">Gira para elegir qué plan romántico hacer esta noche</div>
    </div>
    <button class="exp-launch" onclick="event.stopPropagation();openRoulette()">Girar 🎡</button>
  `;
  rl.onclick = openRoulette;
  c.appendChild(rl);

  // Info about future experiences
  const info = el('div', 'card mt-2');
  info.style.cssText = 'background:var(--rose-pale);border:1px solid var(--rose-border)';
  info.innerHTML = `
    <div class="card-title">Próximamente...</div>
    <div class="card-sub" style="line-height:1.8">
      🕯️ El espejo empañado<br>
      🌙 El jardín de estrellas<br>
      🎈 Los globos de colores<br>
      ⏰ Cápsulas del tiempo
    </div>
  `;
  c.appendChild(info);
}

// ── HELPERS ──
function emptyState(icon, text) {
  const d = el('div', 'empty-state');
  d.innerHTML = `<div class="empty-icon">${icon}</div><div class="empty-text">${text}</div>`;
  return d;
}

// ── INIT ──
async function init() {
  // Load settings
  try {
    const settings = await api('GET', '/settings');
    if (settings) S.settings = { ...S.settings, ...settings };
  } catch (_) {}

  // Nav listeners
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = () => App.navigate(btn.dataset.section);
  });

  // Initial render
  await App.navigate('home');
}

init();
