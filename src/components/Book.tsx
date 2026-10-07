import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { book, site } from "../content";
import { Reveal } from "./Reveal";
import { Truncate } from "./Truncate";

export function Book() {
  const buyHref = book.buyHref || `mailto:${site.email}?subject=${encodeURIComponent(`Ordering ${book.title}`)}`;

  return (
    <section id="book" className="theme-block bg-block text-block-ink">
      <div className={`mx-auto grid max-w-[1400px] items-center gap-16 px-4 pt-24 md:px-8 md:pt-32 lg:grid-cols-12 ${book.endorsements.length ? "pb-16 md:pb-20" : "pb-24 md:pb-32"}`}>
        <div className="order-2 lg:order-1 lg:col-span-6 lg:col-start-1">
          <Reveal>
            <p className="eyebrow !text-accent-2">{book.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(3.25rem,8vw,7rem)]">
              The Human <span className="text-accent-2">Advantage</span>
            </h2>
            <p className="mt-6 max-w-[36ch] text-xl italic leading-snug">{book.subtitle}</p>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-block-muted">{book.body}</p>
            <div className="mt-10">
              <a href={buyHref} className="btn btn-primary" {...(book.buyHref ? { target: "_blank", rel: "noreferrer" } : {})}>
                Get the book
                <ArrowUpRight size={18} weight="bold" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:col-start-8">
          <Cover />
        </div>
      </div>

      <Endorsements />
    </section>
  );
}

const DRIFT_SPEED = 28; // pixels per second: slow enough to read along, not to chase
const GAP = 40; // matches gap-10 on the track

/**
 * Endorsements along the bottom of the book section.
 * With 3+ quotes the row drifts slowly in an endless loop (the list is rendered twice and the
 * scroll position wraps by one list-width). Hovering, focusing or touching pauses it, and the
 * hovered quote stays bright while the rest dim. The arrows and swiping still work.
 * Reduced motion: no drift, no loop, just a scrollable row with arrows. Hidden when empty.
 */
function Endorsements() {
  const list = book.endorsements;
  const reduce = useReducedMotion();
  const loop = !reduce && list.length >= 3;
  const items = loop ? [...list, ...list] : list;
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false); // pointer over the row, keyboard focus inside, or a finger on it
  const holdUntil = useRef(0); // short pause after an arrow click or swipe, so it doesn't fight the user
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // The drift. Writes scrollLeft directly each frame (no React state), so it stays cheap.
  useEffect(() => {
    const el = track.current;
    if (!loop || !el) return;
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const loopWidth = () => (el.children[list.length] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;

    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 64) / 1000 : 0;
      last = t;
      if (!visible || paused.current || t < holdUntil.current || document.hidden) {
        pos = el.scrollLeft; // follow whatever the visitor did while we were paused
      } else {
        const width = loopWidth();
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft; // moved by something else
        pos += DRIFT_SPEED * dt;
        if (pos >= width) pos -= width; // the second copy lines up with the first: invisible jump
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [loop, list.length]);

  // Without the loop, watch the first and last quote to know when an arrow has nothing left to scroll to.
  useEffect(() => {
    const el = track.current;
    if (loop || !el || el.children.length === 0) return;
    const first = el.children[0];
    const last = el.children[el.children.length - 1];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === first) setAtStart(e.intersectionRatio > 0.95);
          if (e.target === last) setAtEnd(e.intersectionRatio > 0.95);
        }
      },
      { root: el, threshold: [0, 0.95, 1] },
    );
    io.observe(first);
    io.observe(last);
    return () => io.disconnect();
  }, [loop, list.length]);

  if (list.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const item = el?.children[0] as HTMLElement | undefined;
    if (!el || !item) return;
    const step = item.offsetWidth + GAP;
    if (loop) {
      holdUntil.current = performance.now() + 1200;
      // Going back from the very start: jump to the identical spot in the second copy first.
      if (dir === -1 && el.scrollLeft < step) {
        el.scrollLeft += (el.children[list.length] as HTMLElement).offsetLeft - item.offsetLeft;
      }
    }
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };
  const showArrows = loop || !(atStart && atEnd);
  // Soft fade on whichever edge has more quotes beyond it (both, when looping).
  const fadeLeft = loop || !atStart;
  const fadeRight = loop || !atEnd;
  const fade = `linear-gradient(to right, ${fadeLeft ? "transparent" : "black"}, black 12%, black 82%, ${fadeRight ? "transparent" : "black"})`;

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8 md:pb-32">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-block-muted">{book.endorsementsLabel}</p>
        {showArrows && (
          <div className="hidden gap-2 md:flex">
            <Arrow dir={-1} disabled={!loop && atStart} onClick={() => scroll(-1)} />
            <Arrow dir={1} disabled={!loop && atEnd} onClick={() => scroll(1)} />
          </div>
        )}
      </div>

      <ul
        ref={track}
        tabIndex={0}
        aria-label={book.endorsementsLabel}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => {
          paused.current = false;
          holdUntil.current = performance.now() + 2500;
        }}
        className={`group/track mt-8 flex gap-10 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] focus-visible:outline-offset-8 [&::-webkit-scrollbar]:hidden ${
          loop ? "" : "snap-x snap-mandatory"
        }`}
        style={{ maskImage: fade, WebkitMaskImage: fade }}
      >
        {items.map((e, i) => (
          <li
            key={i}
            aria-hidden={i >= list.length || undefined}
            className="group/item w-[85%] shrink-0 snap-start transition-opacity duration-500 group-hover/track:not-hover:opacity-35 md:w-[46%] lg:w-[38%]"
          >
            <figure className="border-t border-block-ink/15 pt-8 transition-colors duration-500 group-hover/item:border-accent-2">
              <blockquote className="max-w-[34ch] text-xl italic leading-snug md:text-2xl">
                {/* Long quotes show 4 lines until the quote (or its card) is hovered. */}
                <Truncate lines={4} className="group-hover/item:line-clamp-none" focusable={i < list.length}>
                  <span className="text-accent-2">&ldquo;</span>
                  {e.quote}&rdquo;
                </Truncate>
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-bold">{e.name}</span>
                <span className="block text-block-muted">{e.title}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Arrow({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  const Icon = dir === 1 ? ArrowRight : ArrowLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Next endorsement" : "Previous endorsement"}
      className="grid size-11 place-items-center rounded-full border border-block-ink/20 bg-transparent text-block-ink transition-[opacity,border-color,background-color] duration-300 hover:border-block-ink/50 hover:bg-block-ink/5 disabled:pointer-events-none disabled:opacity-25"
    >
      <Icon size={18} />
    </button>
  );
}

/** The cover leans toward the pointer, like picking a book up off a table. */
function Cover() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18 };
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), spring);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal>
      <div className="p-6 [perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
        <motion.img
          src={book.cover}
          alt={`${book.title} by ${site.name}, book cover`}
          width={343}
          height={551}
          loading="lazy"
          className="w-[min(72vw,340px)] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.06)]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        />
      </div>
    </Reveal>
  );
}
