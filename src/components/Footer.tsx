import { site } from "../content";
import { Socials } from "./Socials";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-12 text-sm text-muted md:flex-row md:items-end md:justify-between md:px-8">
      <div>
        <a href="#top" className="display text-3xl font-bold text-ink">
          {site.name}
        </a>
        <p className="mt-2">{site.tagline}</p>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        <a href="#speaking" className="hover:text-ink">Speaking</a>
        <a href="#book" className="hover:text-ink">Book</a>
        <a href="#gallery" className="hover:text-ink">Gallery</a>
        <a href="#about" className="hover:text-ink">About</a>
      </nav>
      <div className="flex flex-col gap-3 md:items-end">
        <Socials className="-ml-2.5 md:-mr-2.5 md:ml-0" />
        <p>&copy; {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
