import { ArrowUpRight, Check, Copy, EnvelopeSimple, X } from "@phosphor-icons/react";
import { useRef, useState, type ReactNode } from "react";
import { booking, site } from "../content";

const DIALOG_ID = "booking-dialog";
const subject = encodeURIComponent(booking.subject);
const body = encodeURIComponent(booking.body);
const to = encodeURIComponent(site.email);

// mailto: only works when the visitor has a desktop mail app set up, so webmail links are offered first.
const options = [
  { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`, external: true },
  { label: "Outlook", href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`, external: true },
  { label: "Email app", href: `mailto:${site.email}?subject=${subject}&body=${body}`, external: false },
];

/**
 * Every "Book Rabi" button. Goes straight to Calendly when `booking.calendlyUrl` is set,
 * otherwise opens the booking dialog.
 */
export function BookButton({ children, className, onClick }: { children: ReactNode; className: string; onClick?: () => void }) {
  if (booking.calendlyUrl) {
    return (
      <a href={booking.calendlyUrl} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={className}
      onClick={() => {
        onClick?.();
        (document.getElementById(DIALOG_ID) as HTMLDialogElement | null)?.showModal();
      }}
    >
      {children}
    </button>
  );
}

/** Rendered once in App. Native <dialog> handles focus trapping, Escape and the backdrop. */
export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address is on screen and selectable anyway.
    }
  }

  return (
    <dialog
      id={DIALOG_ID}
      ref={ref}
      aria-labelledby="booking-title"
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto w-[min(92vw,34rem)] bg-bg p-0 text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.5)] backdrop:bg-[#0b0d12]/70 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-4">
          <h2 id="booking-title" className="display text-4xl md:text-5xl">
            Book Rabi
          </h2>
          <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full hover:bg-surface">
            <X size={22} />
          </button>
        </div>

        <p className="mt-4 text-muted">
          Email Rabi about your event. Include the date, location, audience and format, and she'll reply personally.
        </p>

        <div className="mt-7 flex items-center justify-between gap-3 rounded-full border border-line py-1.5 pl-5 pr-1.5">
          <span className="min-w-0 select-all truncate font-medium">{site.email}</span>
          <button type="button" onClick={copy} className="btn btn-primary shrink-0 !px-4 !py-2 text-sm">
            {copied ? <Check size={16} weight="bold" /> : <Copy size={16} weight="bold" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="sr-only" role="status">
          {copied ? "Email address copied" : ""}
        </p>

        <p className="mt-7 text-sm text-muted">Or start a pre-filled email in</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {options.map((o) => (
            <a
              key={o.label}
              href={o.href}
              {...(o.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="btn btn-ghost !py-2.5 text-sm"
            >
              {o.external ? <ArrowUpRight size={16} /> : <EnvelopeSimple size={16} />}
              {o.label}
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}
