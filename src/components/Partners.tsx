import { ArrowUpRight } from "@phosphor-icons/react";
import { partners } from "../content";
import { Reveal } from "./Reveal";
import { Truncate } from "./Truncate";

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

          <ul className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
            {charities.map((c, i) => (
              <li key={i}>
                <Reveal delay={i * 0.08}>
                  <Entry partner={c} size="lg" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bodies.length > 0 && (
        <Reveal className={charities.length > 0 ? "mt-20 border-t border-line pt-10 md:mt-28" : ""}>
          <p className="text-sm text-muted">{partners.partnersLabel}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {bodies.map((p, i) => (
              <li key={i}>
                <Entry partner={p} size="md" />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}

/** "quiversacademy.org" from "https://www.quiversacademy.org/about". */
function domain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

/** Logo (when there is one), name, optional note, and the website as a small link. */
function Entry({ partner, size }: { partner: Partner; size: "lg" | "md" }) {
  const { name, logo, href, note } = partner;
  return (
    <div>
      {logo && (
        <img
          src={logo}
          alt=""
          loading="lazy"
          className={`mb-4 w-auto max-w-[180px] object-contain object-left ${size === "lg" ? "h-14" : "h-10"}`}
        />
      )}
      <p className={`display ${size === "lg" ? "text-3xl" : "text-2xl"}`}>{name}</p>
      {note && (
        <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-muted">
          <Truncate lines={3}>{note}</Truncate>
        </p>
      )}
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${name} website (opens in a new tab)`}
          className="group mt-2 inline-flex items-center gap-1 text-sm text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
        >
          {domain(href)}
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
