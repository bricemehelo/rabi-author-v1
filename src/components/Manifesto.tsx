import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { manifesto } from "../content";

/** The core argument, lit word by word as the reader scrolls through it. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = manifesto.split(" ");

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:pt-24 md:pb-36">
      <p
        ref={ref}
        className="max-w-[46ch] text-[clamp(1.9rem,5.4vw,2.75rem)] leading-[1.15] tracking-[-0.02em]"
      >
        {words.map((word, i) =>
          reduce ? (
            <span key={i}>{word} </span>
          ) : (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
            </Word>
          ),
        )}
      </p>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}
