# Yasmin App

Aplicación romántica personal para Yasmin. Node.js + Express + JSON DB.

## Cómo arrancar
```
npm start   # → http://localhost:3000
```

## Estructura
- `server.js` — Express (puerto 3000). Sirve `/love` como estático para las fotos.
- `database.js` — JSON DB en `data/yasmin.json`. Seed automático en primer arranque.
- `routes/` — letters, notes, poems, gallery, capsules, dates, settings, movies
- `public/` — SPA: index.html + styles.css + app.js
- `love/` — Cartas (PDF/txt) + fotos (en subcarpetas). Gitignored para datos, pero el seed las carga.
- `uploads/` — Fotos subidas desde la app. Gitignored.

## Secciones de la app
- **Inicio** — contador días juntos + frase del día + ruleta romántica
- **Cartas** — lector de libro para cartas PDF y txt
- **Notas** — notas diarias con estado de ánimo
- **Poemas** — poemas, canciones e historias
- **Galería** — fotos de Yasmin con descripciones (pre-seedadas desde `love/notas de fotos/`)
- **Barbie** — reproductor de películas vía Google Drive embed
- **Detalles** — 5 experiencias interactivas + ruleta romántica

## Decisiones importantes
- Sin emojis en la UI → iconos SVG en línea (ver `ICONS` en app.js)
- Gallery items pre-seeded tienen campo `src` (URL a `/love/...`) en vez de `filename`
- Películas Barbie: el usuario pega un enlace de Google Drive → se convierte a embed URL automáticamente
- Logo: fuente "Great Vibes" con flores SVG a los lados en el `<header>`
- Tipografía: Great Vibes (logo) · Playfair Display (títulos) · Cormorant Garamond (cuerpo) · Jost (UI)

## Base de datos
Si necesitas resetear el seed: borrar `data/yasmin.json` y reiniciar el servidor.

## GitHub Pages
`index.html` en la raíz → experiencia "La Linterna de Yasmin" (sin backend).
La app completa solo funciona con el servidor Node.js activo.
