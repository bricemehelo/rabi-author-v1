import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { stages } from "../content";
import { photo } from "../photos";
import { Picture } from "./Picture";

/** Full-bleed stage photo with a slow parallax drift, then the events Rabi has spoken at. */
export function Stages() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section aria-label={stages.label} className="pb-24 md:pb-32">
      <div ref={ref} className="relative h-[60vh] min-h-[340px] overflow-hidden md:h-[80vh]">
        <motion.div className="absolute inset-x-0 -inset-y-[10%]" style={reduce ? undefined : { y }}>
          <Picture photo={photo(stages.photo)} sizes="100vw" position="50% 40%" />
        </motion.div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1400px] flex-col gap-4 px-4 md:mt-12 md:flex-row md:items-baseline md:gap-12 md:px-8">
        <p className="shrink-0 text-sm text-muted">{stages.label}</p>
        <ul className="flex flex-wrap gap-x-10 gap-y-3">
          {stages.names.map((n) => (
            <li key={n} className="display text-2xl md:text-3xl">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
