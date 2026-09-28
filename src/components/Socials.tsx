import { FacebookLogo, InstagramLogo, LinkedinLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react";
import { booking, site, type SocialIcon } from "../content";

/** Where every "Book Rabi" button goes: Calendly when configured, otherwise a pre-filled email. */
export const bookingHref =
  booking.calendlyUrl ||
  `mailto:${site.email}?subject=${encodeURIComponent(booking.subject)}&body=${encodeURIComponent(booking.body)}`;

export const bookingTarget = booking.calendlyUrl ? { target: "_blank", rel: "noreferrer" } : {};

const icons = { linkedin: LinkedinLogo, instagram: InstagramLogo, x: XLogo, youtube: YoutubeLogo, facebook: FacebookLogo };

/** Social icons. Profiles without a link yet render greyed out and inert. */
export function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {site.socials.map((s) => {
        const Icon = icons[s.icon];
        return (
          <li key={s.label}>
            {s.href ? (
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${site.name} on ${s.label}`}
                className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-bg"
              >
                <Icon size={20} weight="regular" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={`${s.label} coming soon`}
                className="grid size-10 cursor-not-allowed place-items-center rounded-full text-muted opacity-40"
              >
                <Icon size={20} weight="regular" aria-hidden />
                <span className="sr-only">{s.label} (coming soon)</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
