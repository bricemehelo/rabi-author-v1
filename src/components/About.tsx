import { about } from "../content";
import { photo } from "../photos";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden">
            <Picture photo={photo(about.photo)} sizes="(min-width: 1024px) 40vw, 100vw" position="50% 15%" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
          <Reveal>
            <h2 className="display max-w-[14ch] text-[clamp(2.5rem,5.5vw,4.75rem)]">{about.headline}</h2>
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((p) => (
                <p key={p} className="max-w-[58ch]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
