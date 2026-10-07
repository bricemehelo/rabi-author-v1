import { animate, motion, useMotionValue, useReducedMotion, type MotionValue, type Variants } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "../content";
import { photo } from "../photos";
import { Picture } from "./Picture";

const HOLD = 5.5; // seconds each photo stays before the page turns
const TURN = 1.15; // seconds for the page turn
const turnEase = [0.645, 0.045, 0.355, 1] as const;

/**
 * The hero photos as pages of a book. Every few seconds the top photo turns away like a page,
 * hinged on its left edge, revealing the next photo underneath. All photos stay mounted (so the
 * next one is already loaded when the page lifts); only the current page and the one beneath
 * it are visible. Thin progress lines double as controls. Hover, focus, an off-screen hero or a
 * hidden tab pauses it. Reduced motion: no autoplay, and switching is a plain crossfade.
 */
export function HeroSlides() {
  const slides = hero.photos;
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState<number | null>(null); // page being revealed, while turning
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0); // 0..1 through the current photo's hold time

  const turnTo = useCallback(
    (i: number) => {
      if (target !== null || i === index) return;
      setTarget(i);
    },
    [index, target],
  );

  const finishTurn = () => {
    if (target === null) return;
    progress.set(0);
    setIndex(target);
    setTarget(null);
  };

  // Only advance while the hero is on screen and the tab is visible.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden));
    io.observe(el);
    const onVisibility = () => setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // The hold timer is the progress line itself: when it fills, the page turns.
  useEffect(() => {
    if (reduce || paused || !visible || target !== null || slides.length < 2) return;
    const controls = animate(progress, 1, {
      duration: HOLD * (1 - progress.get()),
      ease: "linear",
      onComplete: () => turnTo((index + 1) % slides.length),
    });
    return () => controls.stop();
  }, [reduce, paused, visible, target, index, slides.length, progress, turnTo]);

  if (slides.length === 0) return null;

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of Rabi Atiti with The Human Advantage"
      className="relative h-full [perspective:1800px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, i) => {
        const isCurrent = i === index;
        const isTarget = i === target;
        const turning = isCurrent && target !== null;
        return (
          <motion.div
            key={s.id}
            aria-hidden={!isCurrent}
            className="absolute inset-0 origin-left [backface-visibility:hidden]"
            style={{ zIndex: isCurrent ? 3 : isTarget ? 2 : 1 }}
            variants={pageVariants(reduce)}
            initial={false}
            animate={turning ? "turning" : isTarget ? "revealed" : isCurrent ? "shown" : "hidden"}
            // Every state sets all three values, so no stray "reset" animation can end the turn early;
            // and only the end of the turn itself moves to the next photo.
            onAnimationComplete={(name) => name === "turning" && finishTurn()}
          >
            <Picture
              photo={photo(s.id)}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority={i === 0}
              position={s.position}
            />
            {/* The page darkens as it lifts, like light falling off a turning page. */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent"
              initial={false}
              animate={{ opacity: turning && !reduce ? 1 : 0 }}
              transition={{ duration: TURN, ease: turnEase }}
            />
          </motion.div>
        );
      })}

      {/* Spine shadow on the page underneath, strongest while a page is turning. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-1/3 bg-gradient-to-r from-black/30 to-transparent"
        initial={false}
        animate={{ opacity: target !== null && !reduce ? 1 : 0 }}
        transition={{ duration: TURN * 0.6 }}
      />

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-[4] bg-gradient-to-t from-black/45 to-transparent px-4 pb-3 pt-10">
          <div className="flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => turnTo(i)}
                aria-label={`Show photo ${i + 1} of ${slides.length}`}
                aria-current={i === index}
                className="group flex h-6 flex-1 items-center"
              >
                <span className="relative block h-[2px] w-full overflow-hidden bg-white/35 transition-[height] group-hover:h-[3px]">
                  <Fill i={i} index={index} target={target} progress={progress} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** The four states a page can be in. */
function pageVariants(reduce: boolean | null): Variants {
  const instant = { duration: 0 };
  return {
    // the photo on top, at rest
    shown: { opacity: 1, rotateY: 0, scale: 1, transition: instant },
    // waiting further down the stack
    hidden: { opacity: 0, rotateY: 0, scale: reduce ? 1 : 1.06, transition: instant },
    // the top page lifting away (a crossfade when motion is reduced)
    turning: reduce
      ? { opacity: 0, rotateY: 0, scale: 1, transition: { duration: 0.6 } }
      : { opacity: 1, rotateY: -100, scale: 1, transition: { duration: TURN, ease: turnEase } },
    // the page underneath, settling into place as it is uncovered
    revealed: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { opacity: instant, scale: { duration: reduce ? 0 : TURN, ease: [0.16, 1, 0.3, 1] as const } },
    },
  };
}

/** Lines before the current photo are full, the current one fills with the timer, later ones are empty. */
function Fill({ i, index, target, progress }: { i: number; index: number; target: number | null; progress: MotionValue<number> }) {
  const shown = target ?? index;
  if (i > shown) return null;
  if (i < shown || target !== null) return <span className="absolute inset-0 bg-white" />;
  return <motion.span className="absolute inset-0 origin-left bg-white" style={{ scaleX: progress }} />;
}
