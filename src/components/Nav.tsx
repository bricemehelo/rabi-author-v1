import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "../content";
import { BookButton } from "./Booking";

const links = [
  { href: "#speaking", label: "Speaking" },
  { href: "#book", label: "Book" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="theme-dark sticky top-0 z-40 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:h-[72px] md:px-8">
        <a href="#top" className="display text-2xl font-bold">
          {site.name}
        </a>

        <nav aria-label="Main" className="hidden items-center gap-9 text-[0.95rem] text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <BookButton className="btn btn-primary hidden !py-2.5 sm:inline-flex">Book Rabi</BookButton>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} weight="regular" /> : <List size={24} weight="regular" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-line bg-bg px-4 pb-8 pt-4 md:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="display block py-3 text-4xl">
                {l.label}
              </a>
            ))}
            <BookButton onClick={() => setOpen(false)} className="btn btn-primary mt-6">
              Book Rabi
            </BookButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
