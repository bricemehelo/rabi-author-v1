import { palettes, type PaletteId } from "./content";

const STORAGE_KEY = "palette";
const isPalette = (v: unknown): v is PaletteId => palettes.options.some((o) => o.id === v);

/** The palette to start with: the visitor's saved choice (if switching is on), else the default. */
export function initialPalette(): PaletteId {
  if (!palettes.showSwitcher) return palettes.defaultPalette;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isPalette(saved)) return saved;
  } catch {
    // storage blocked (private mode etc.): fall back to the default
  }
  return palettes.defaultPalette;
}

/** Puts the palette on <html> and matches the phone browser's toolbar colour to it. */
export function applyPalette(id: PaletteId, { save = false, animate = false } = {}) {
  const html = document.documentElement;
  if (animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    html.classList.add("palette-switching");
    window.setTimeout(() => html.classList.remove("palette-switching"), 500);
  }
  html.dataset.palette = id;
  const navColor = getComputedStyle(html).getPropertyValue("--nav-color").trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", navColor);
  if (save) {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // not saved; the switch still works for this visit
    }
  }
}
