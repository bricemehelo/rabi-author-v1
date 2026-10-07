import { useState } from "react";
import { palettes, type PaletteId } from "../content";
import { applyPalette, initialPalette } from "../palette";

/** Classic / Inclusion switch for the footer. Hidden when palettes.showSwitcher is false. */
export function PaletteSwitch() {
  const [current, setCurrent] = useState<PaletteId>(initialPalette);
  if (!palettes.showSwitcher || palettes.options.length < 2) return null;

  const choose = (id: PaletteId) => {
    if (id === current) return;
    applyPalette(id, { save: true, animate: true });
    setCurrent(id);
  };

  return (
    <div role="group" aria-label="Colour palette" className="flex items-center gap-1 rounded-full border border-line p-1">
      {palettes.options.map((o) => {
        const active = o.id === current;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => choose(o.id)}
            className={`flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3 text-xs font-bold transition-colors ${
              active ? "bg-ink text-bg" : "text-muted hover:text-ink"
            }`}
          >
            <span aria-hidden className="flex -space-x-1">
              {o.swatches.map((c) => (
                <span key={c} className="size-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: c }} />
              ))}
            </span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
