import { About } from "./components/About";
import { Book } from "./components/Book";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Nav } from "./components/Nav";
import { Speaking } from "./components/Speaking";
import { Stages } from "./components/Stages";
import { Testimonials } from "./components/Testimonials";

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <div className="theme-dark">
          <Hero />
          <Manifesto />
          <Stages />
        </div>
        <Speaking />
        <Book />
        <Testimonials />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
