import { testimonials } from "../content";
import { Reveal } from "./Reveal";

/** One featured quote, two supporting ones beneath it. */
export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section aria-label="What organisers say" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-36">
      <Reveal>
        <figure>
          <blockquote className="max-w-[22ch] text-[clamp(2rem,4.8vw,4rem)] font-medium leading-[1.1] tracking-tight">
            <span className="text-accent-ink">&ldquo;</span>
            {featured.quote}&rdquo;
          </blockquote>
          <Attribution name={featured.name} role={featured.role} />
        </figure>
      </Reveal>

      <div className="mt-20 grid gap-12 md:ml-[33%] md:grid-cols-2 md:gap-10">
        {rest.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <figure className="border-t border-line pt-8">
              <blockquote className="text-xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <Attribution name={t.name} role={t.role} />
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Attribution({ name, role }: { name: string; role: string }) {
  return (
    <figcaption className="mt-6 text-sm">
      <span className="font-semibold">{name}</span>
      <span className="block text-muted">{role}</span>
    </figcaption>
  );
}
