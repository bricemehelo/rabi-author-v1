import data from "./data/photos.json";

export type Photo = (typeof data)[number];

export const photos: Photo[] = data;

const fallback = photos.find((p) => p.category === "portraits") ?? photos[0];

/** Look up a photo by id ("speaking/rabi-keynote"). Falls back to a portrait so a typo never breaks the page. */
export function photo(id: string): Photo {
  const found = photos.find((p) => p.id === id);
  if (!found && import.meta.env.DEV) console.warn(`[photos] "${id}" not found, run \`npm run photos\`?`);
  return found ?? fallback;
}
