import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { book, site } from "../content";
import { Reveal } from "./Reveal";

export function Book() {
  const buyHref = book.buyHref || `mailto:${site.email}?subject=${encodeURIComponent(`Ordering ${book.title}`)}`;

  return (
    <section id="book" className="bg-block text-block-ink">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-6 lg:col-start-1">
          <Reveal>
            <p className="eyebrow !text-accent">{book.eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(3.25rem,8vw,7rem)]">
              The Human <span className="text-accent">Advantage</span>
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
    </section>
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
