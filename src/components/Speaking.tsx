import { ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { speaking } from "../content";
import { photo } from "../photos";
import { LinkedInPosts } from "./LinkedInPosts";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

/** Topic list on the left; the photo on the right follows whichever topic is active. */
export function Speaking() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = speaking.topics[active];

  return (
    <section id="speaking" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[clamp(2.5rem,5.5vw,4.75rem)]">{speaking.headline}</h2>
          </Reveal>

          <ol className="mt-14 border-t border-line">
            {speaking.topics.map((t, i) => {
              const isActive = i === active;
              return (
                <li key={t.title} className="border-b border-line">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-7 text-left font-serif"
                  >
                    <span className={`text-2xl tracking-tight transition-colors md:text-3xl ${isActive ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                      {t.title}
                    </span>
                    <ArrowRight
                      size={22}
                      className={`transition-all duration-500 ${isActive ? "translate-x-0 text-accent-ink opacity-100" : "-translate-x-2 opacity-0"}`}
                    />
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          className="col-span-2 block overflow-hidden"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <span className="block max-w-[52ch] pt-3 text-lg leading-relaxed text-muted">{t.body}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>

          <Reveal className="mt-12">
            <p className="text-sm text-muted">Available for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {speaking.formats.map((f) => (
                <li key={f} className="rounded-full border border-line px-4 py-2 text-sm">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-surface">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Picture photo={photo(current.photo)} sizes="40vw" position={current.position} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <LinkedInPosts />
    </section>
  );
}
