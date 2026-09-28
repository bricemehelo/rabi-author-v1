import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import { contact, site } from "../content";
import { Reveal } from "./Reveal";
import { bookingHref, bookingTarget, Socials } from "./Socials";

export function Contact() {
  return (
    <section id="contact" className="bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 className="display mt-6 max-w-[16ch] text-[clamp(3rem,7vw,6rem)]">{contact.headline}</h2>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-muted">{contact.body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={bookingHref} {...bookingTarget} className="btn btn-primary">
              Book Rabi
              <ArrowUpRight size={18} weight="bold" />
            </a>
            <a href={`mailto:${site.email}`} className="text-muted underline decoration-line underline-offset-4 hover:text-ink">
              {site.email}
            </a>
          </div>
          <Socials className="-ml-2.5 mt-8" />
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end" delay={0.1}>
          <Newsletter />
        </Reveal>
      </div>
    </section>
  );
}

type Status = "idle" | "sending" | "done" | "error";

function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const { endpoint, headline, body } = contact.newsletter;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");

    if (!endpoint) {
      // No mailing-list service connected yet: hand the sign-up to Rabi's inbox.
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Add me to the Sunday note")}&body=${encodeURIComponent(email)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex gap-3" role="status">
        <CheckCircle size={24} weight="fill" className="shrink-0 text-accent-ink" />
        <p className="text-lg">You're on the list. The next note arrives on Sunday.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate={false}>
      <h3 className="text-xl font-semibold tracking-tight">{headline}</h3>
      <p className="mt-2 text-muted">{body}</p>
      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor="newsletter-email" className="text-sm font-medium">
          Email address
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-describedby="newsletter-help"
            aria-invalid={status === "error"}
            className="min-w-0 flex-1 rounded-full border border-muted/40 bg-bg px-5 py-3 text-ink placeholder:text-muted focus:border-ink focus:outline-none"
          />
          <button type="submit" disabled={status === "sending"} className="btn btn-primary justify-center disabled:opacity-70">
            {status === "sending" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
        {status === "error" ? (
          <p id="newsletter-help" className="text-sm text-red-700 dark:text-red-400" role="alert">
            That didn't go through. Please try again, or email {site.email}.
          </p>
        ) : (
          <p id="newsletter-help" className="text-sm text-muted">
            One email a week. Unsubscribe any time.
          </p>
        )}
      </div>
    </form>
  );
}
