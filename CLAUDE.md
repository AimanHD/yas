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
- **Inicio** — contador + ojos + frase del día + sobre 100 días + próximas fechas + accesos a todas las secciones
- **Cartas** — agrupadas: Cartas (txt) · Historias · Tarjetas (png/jpg) · PDF
- **Notas** — notas diarias; `mood` es una clave de `MOODS` (SVG). Los emojis antiguos se mapean vía `legacy`
- **Poemas** — `textoflores.txt` se separa en un poema por flor
- **Galería** — "Fotos & Palabras" (flip cards de las fotos seed con texto) + fotos subidas
- **Recuerdos** / **Flores** — por fechas; Flores enlaza a los poemas de flores
- **Barbie** — películas vía YouTube / Google Drive embed
- **Detalles** — 5 experiencias + ruleta, cuestionario de cita, sorpresa de cumpleaños, lluvia de corazones, cápsulas del tiempo (`/api/capsules`) y fechas (`/api/dates`)
- Sorpresa de cumpleaños: solo sale sola el día de `settings.birthday` (21-09-2001), editable en Configuración

## Seed
Idempotente con `ensure()` (por título, o `src` en galería): añade lo que falte también en la BD de producción. Para añadir contenido nuevo de `love/`, añadirlo a la lista correspondiente en `database.js`.

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
