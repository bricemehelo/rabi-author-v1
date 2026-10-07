import { partners } from "../content";
import { Reveal } from "./Reveal";

type Partner = (typeof partners.charities)[number];

/**
 * Charities the book supports (the cause, told as one sentence) and, under a hairline,
 * a quiet row of professional partners. Either group hides itself when its list is empty.
 */
export function Partners() {
  const { charities, partners: bodies } = partners;
  if (charities.length === 0 && bodies.length === 0) return null;

  return (
    <section id="partners" aria-label="Partners and causes" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      {charities.length > 0 && (
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="text-sm text-muted">{partners.causeLabel}</p>
            <h2 className="display mt-5 max-w-[20ch] text-[clamp(2.25rem,4.6vw,4rem)]">{partners.causeHeadline}</h2>
          </Reveal>

          <ul className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            {charities.map((c, i) => (
              <li key={i}>
                <Reveal delay={i * 0.08}>
                  <Mark partner={c} size="lg" />
                  {c.note && <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-muted">{c.note}</p>}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bodies.length > 0 && (
        <Reveal className={charities.length > 0 ? "mt-20 border-t border-line pt-10 md:mt-28" : ""}>
          <p className="text-sm text-muted">{partners.partnersLabel}</p>
          <ul className="mt-8 flex flex-wrap items-center gap-x-14 gap-y-8">
            {bodies.map((p, i) => (
              <li key={i}>
                <Mark partner={p} size="md" />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}

/** A partner's logo (greyed until hovered) or, without one, their name in the headline font. */
function Mark({ partner, size }: { partner: Partner; size: "lg" | "md" }) {
  const content = partner.logo ? (
    <img
      src={partner.logo}
      alt={partner.name}
      loading="lazy"
      className={`w-auto max-w-[180px] object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 ${
        size === "lg" ? "h-12" : "h-9"
      }`}
    />
  ) : (
    <span className={`display block text-muted transition-colors duration-300 group-hover:text-ink ${size === "lg" ? "text-3xl" : "text-2xl"}`}>
      {partner.name}
    </span>
  );

  return partner.href ? (
    <a href={partner.href} target="_blank" rel="noreferrer" className="group inline-block">
      {content}
    </a>
  ) : (
    <span className="group inline-block">{content}</span>
  );
}
