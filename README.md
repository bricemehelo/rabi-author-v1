# Rabi Atiti: author & speaker website

Vite + React + Tailwind v4 + Motion. Use Node 20 (`nvm use`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # optimises photos, type-checks, builds to dist/
```

## Adding Rabi's photos

1. Put the original photos (JPG, PNG, HEIC from iPhone, any size) into a folder under `photos/`:
   - `photos/portraits/`: studio headshots
   - `photos/speaking/`: on stage, with microphone, workshops
   - `photos/events/`: signings, panels, candid shots
   - Any new folder you create becomes a new filter in the gallery.
2. Give files descriptive names: `keynote-lagos-2025.jpg` becomes the alt text "Rabi Atiti, keynote lagos 2025".
3. Run `npm run photos`. It creates web-sized versions in `public/photos/` and updates `src/data/photos.json`.
4. Optional captions: add entries to `photos/captions.json`, e.g. `{ "speaking/keynote-lagos-2025": "Keynote, Lagos Business School, 2025" }`.

To use a photo somewhere specific (hero, about, a speaking topic), set its id (`folder/file-name`) in `src/content.ts`.

## Editing text

All copy lives in `src/content.ts`. Search it for `TODO` before launch:
real testimonials, the book purchase link, the newsletter form endpoint, the email address and social links.

## Deploying

Import the repo on Vercel (framework preset: Vite). Build command `npm run build`, output `dist`.
