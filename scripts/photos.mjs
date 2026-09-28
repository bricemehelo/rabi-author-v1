// Turns the original photos in /photos into fast, web-sized images.
//
//   photos/<category>/<name>.jpg   ->  public/photos/<category>/<name>-{800,1800}.webp
//                                   ->  src/data/photos.json (the list the site reads)
//
// Drop new photos into a category folder (portraits, speaking, events, ...) and run
// `npm run photos`. Captions are optional: add them to photos/captions.json as
// { "speaking/rabi-keynote-lagos": "Keynote at ... 2025" }.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "photos");
const OUT = path.join(ROOT, "public", "photos");
const MANIFEST = path.join(ROOT, "src", "data", "photos.json");
const SIZES = [800, 1800];
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".tif", ".tiff"]);

const captionsFile = path.join(SRC, "captions.json");
const captions = existsSync(captionsFile) ? JSON.parse(readFileSync(captionsFile, "utf8")) : {};

const slug = (s) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");

const titleFromName = (name) => {
  const words = name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

// sharp's prebuilt binaries cannot decode iPhone HEIC files; macOS `sips` can.
function readable(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== ".heic" && ext !== ".heif") return file;
  const tmp = path.join(tmpdir(), `${slug(path.basename(file, ext))}-${Date.now()}.jpg`);
  execFileSync("sips", ["-s", "format", "jpeg", file, "--out", tmp], { stdio: "ignore" });
  return tmp;
}

function newest(file) {
  return existsSync(file) ? statSync(file).mtimeMs : 0;
}

const photos = [];
mkdirSync(OUT, { recursive: true });

for (const category of readdirSync(SRC).sort()) {
  const dir = path.join(SRC, category);
  if (!statSync(dir).isDirectory() || category.startsWith(".")) continue;

  for (const fileName of readdirSync(dir).sort()) {
    const ext = path.extname(fileName).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;

    const source = path.join(dir, fileName);
    const name = slug(path.basename(fileName, ext));
    const id = `${slug(category)}/${name}`;
    const outDir = path.join(OUT, slug(category));
    mkdirSync(outDir, { recursive: true });

    const input = readable(source);
    const image = sharp(input).rotate(); // respect camera orientation
    const { width, height } = await image.metadata().then(async (m) => {
      // .rotate() swaps dimensions for portrait EXIF orientations
      const swap = m.orientation && m.orientation >= 5;
      return swap ? { width: m.height, height: m.width } : { width: m.width, height: m.height };
    });

    const srcset = [];
    for (const size of SIZES) {
      const target = Math.min(size, width);
      if (srcset.some((s) => s.width === target)) continue;
      const outFile = path.join(outDir, `${name}-${size}.webp`);
      if (newest(outFile) < statSync(source).mtimeMs) {
        await sharp(input).rotate().resize({ width: target, withoutEnlargement: true }).webp({ quality: 80 }).toFile(outFile);
      }
      srcset.push({ url: `/photos/${slug(category)}/${name}-${size}.webp`, width: target });
    }

    const { dominant } = await sharp(input).stats();
    if (input !== source) rmSync(input);

    photos.push({
      id,
      category: slug(category),
      alt: captions[id] ? `Rabi Atiti, ${captions[id]}` : `Rabi Atiti,${titleFromName(name).toLowerCase().replace(/^rabi\s*/, "")}`.replace(/,\s*$/, ""),
      caption: captions[id] ?? null,
      width,
      height,
      color: `rgb(${dominant.r} ${dominant.g} ${dominant.b})`,
      src: srcset[0].url,
      srcset: srcset.map((s) => `${s.url} ${s.width}w`).join(", "),
      large: srcset[srcset.length - 1].url,
    });
  }
}

// Remove web versions of photos that were deleted or renamed in /photos.
const keep = new Set(photos.flatMap((p) => p.srcset.split(", ").map((s) => path.join(ROOT, "public", s.split(" ")[0]))));
for (const category of readdirSync(OUT)) {
  const dir = path.join(OUT, category);
  if (!statSync(dir).isDirectory()) continue;
  for (const f of readdirSync(dir)) if (!keep.has(path.join(dir, f))) rmSync(path.join(dir, f));
  if (readdirSync(dir).length === 0) rmSync(dir, { recursive: true });
}

mkdirSync(path.dirname(MANIFEST), { recursive: true });
writeFileSync(MANIFEST, JSON.stringify(photos, null, 2) + "\n");
console.log(`photos: ${photos.length} image(s) ready -> src/data/photos.json`);
