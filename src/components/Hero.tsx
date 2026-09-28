import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "../content";
import { photo } from "../photos";
import { Picture } from "./Picture";
import { BookButton } from "./Booking";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section id="top" className="mx-auto grid max-w-[1400px] gap-10 px-4 pt-10 pb-16 md:px-8 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-12 lg:grid-rows-[1fr] lg:gap-8 lg:py-12">
      <div className="flex flex-col justify-center lg:col-span-7 lg:pr-8">
        <motion.p className="eyebrow" {...rise(0.1)}>
          {hero.eyebrow}
        </motion.p>

        <motion.h1 className="display mt-6 text-[clamp(3.5rem,11vw,9.5rem)]" {...rise(0.2)}>
          {hero.headline[0]}
          <br />
          {hero.headline[1]}{" "}
          <span className="relative isolate inline-block px-[0.12em] pb-[0.04em] italic text-on-accent">
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-[0.04em] bottom-[0.02em] -z-10 origin-left bg-accent"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease }}
            />
            {hero.emphasis}
          </span>
        </motion.h1>

        <motion.p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-muted md:text-xl" {...rise(0.35)}>
          {hero.sub}
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...rise(0.45)}>
          <BookButton className="btn btn-primary group">
            Book Rabi
            <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </BookButton>
          <a href="#book" className="btn btn-ghost">
            Explore the book
          </a>
        </motion.div>
      </div>

      <motion.div
        className="relative aspect-[4/5] overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[560px]"
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.2, delay: 0.15, ease }}
      >
        <motion.div
          className="h-full"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, delay: 0.15, ease }}
        >
          <Picture photo={photo(hero.photo)} sizes="(min-width: 1024px) 40vw, 100vw" priority position="50% 15%" />
        </motion.div>
      </motion.div>
    </section>
  );
}
