import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { about, gallery, hero, stages } from "../content";
import { photos, type Photo } from "../photos";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

const ALL = "all";
// Photos already featured large elsewhere on the page are left out of the gallery.
const featured = new Set([...hero.photos.map((p) => p.id), about.photo, stages.photo]);
const pool = photos.filter((p) => !featured.has(p.id));
const label = (c: string) => gallery.labels[c] ?? c.charAt(0).toUpperCase() + c.slice(1).replace(/-/g, " ");

export function Gallery() {
  const reduce = useReducedMotion();
  const order = Object.keys(gallery.labels);
  const rank = (c: string) => (order.includes(c) ? order.indexOf(c) : order.length);
  const categories = useMemo(() => [...new Set(pool.map((p) => p.category))].sort((a, b) => rank(a) - rank(b)), []);
  const [filter, setFilter] = useState(ALL);
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const all = useMemo(() => interleave(categories.map((c) => pool.filter((p) => p.category === c))), [categories]);
  const matching = filter === ALL ? all : pool.filter((p) => p.category === filter);
  const shown = expanded ? matching : matching.slice(0, gallery.initialCount);
  const hidden = matching.length - shown.length;

  return (
    <section id="gallery" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="display max-w-[14ch] text-[clamp(2.5rem,5.5vw,4.75rem)]">{gallery.headline}</h2>
      </Reveal>

      {categories.length > 1 && (
        <div role="group" aria-label="Filter photos" className="mt-10 flex flex-wrap gap-2">
          {[ALL, ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === c ? "bg-ink text-bg" : "border border-line text-muted hover:text-ink"
              }`}
            >
              {c === ALL ? "All" : label(c)}
            </button>
          ))}
        </div>
      )}

      <motion.ul layout={!reduce} className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.li
              key={p.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full overflow-hidden"
                aria-label={`Open photo: ${p.alt}`}
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
              >
                <Picture
                  photo={p}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              </button>
              {p.caption && <p className="mt-2 text-sm text-muted">{p.caption}</p>}
            </motion.li>
          ))}
        </AnimatePresence>
        {import.meta.env.DEV && <DevPlaceholders count={Math.max(0, 9 - shown.length)} />}
      </motion.ul>

      {hidden > 0 && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setExpanded(true)} className="btn btn-ghost">
            Show all {matching.length} photos
          </button>
        </div>
      )}

      <AnimatePresence>
        {openIndex !== null && shown[openIndex] && (
          <Lightbox photos={shown} index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/** Mixes the folders together (speaking, panel, event, ...) so the "All" view isn't one category at a time. */
function interleave<T>(groups: T[][]): T[] {
  const out: T[] = [];
  for (let i = 0; groups.some((g) => i < g.length); i++) for (const g of groups) if (i < g.length) out.push(g[i]);
  return out;
}

function Lightbox({
  photos: list,
  index,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const p = list[index];
  const go = useCallback((d: number) => onIndex((index + d + list.length) % list.length), [index, list.length, onIndex]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex flex-col bg-[#070b14]/95 text-white backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <p className="text-sm text-white/70" aria-live="polite">
          {index + 1} of {list.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="grid size-11 place-items-center rounded-full hover:bg-white/10">
          <X size={24} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20" onClick={onClose}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={p.id}
            src={p.large}
            srcSet={p.srcset}
            sizes="90vw"
            alt={p.alt}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
            drag={reduce || list.length < 2 ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        {list.length > 1 && (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      <p className="min-h-14 px-4 py-4 text-center text-sm text-white/70">{p.caption ?? ""}</p>
    </motion.div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 hover:bg-white/10 md:grid ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <Icon size={22} />
    </button>
  );
}

/** Development only: shows where more photos will land. Never rendered in the production build. */
function DevPlaceholders({ count }: { count: number }) {
  const ratios = ["4 / 5", "1 / 1", "3 / 2", "4 / 5", "3 / 4", "3 / 2", "1 / 1", "4 / 5", "3 / 2"];
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <li key={`placeholder-${i}`} className="break-inside-avoid">
          <div
            className="grid place-items-center border border-dashed border-line p-6 text-center text-sm text-muted"
            style={{ aspectRatio: ratios[i % ratios.length] }}
          >
            Drop photos into /photos/&lt;folder&gt; and run npm run photos
          </div>
        </li>
      ))}
    </>
  );
}
