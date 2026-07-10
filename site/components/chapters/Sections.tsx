import { leadership, skills, technologies, recognition } from "@/data/content";

export function Intro() {
  const stats = [
    ["14+", "Years · Tier 1"],
    ["3", "Markets · EU / CA / US"],
    ["7", "Operators & suppliers"],
    ["250%", "ROI · 19 change requests"],
  ];
  return (
    <section id="intro" className="chapter ground-light">
      <div className="wrap">
        <p className="eyebrow reveal">Introduction</p>
        <h2 className="h-chapter reveal mt-4 max-w-[20ch]">
          I build the products behind Tier 1 operators — and the systems that let them scale.
        </h2>
        <p className="lead reveal mt-6 max-w-[56ch] !opacity-70">
          From the betslip to whole-market launches: research, design systems, product strategy,
          platform migration, and the P&amp;L impact that follows.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-10">
          {stats.map(([n, l]) => (
            <div key={l}>
              <div className="metric-n text-[2.6rem] text-gold-soft">{n}</div>
              <div className="mono-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section id="journey" className="chapter ground-light-alt">
      <div className="wrap grid items-center gap-12 md:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="eyebrow reveal">My journey</p>
          <h2 className="h-chapter reveal mt-3 max-w-[13ch]">
            It started at twelve, with a receipt printer.
          </h2>
        </div>
        <div className="reveal space-y-4 opacity-80">
          <p>
            A VHS-rental system in Estonia — UI, front end, back end, and its own printed
            receipts. One kid, one screen, one complete product.
          </p>
          <p>
            That instinct — <strong>make complex systems feel effortless</strong> — never
            changed. Only the scale did: one product, one platform, one market, one industry.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  return (
    <section id="leadership" className="chapter ground-light">
      <div className="wrap">
        <p className="eyebrow reveal">Product leadership</p>
        <h2 className="h-chapter reveal mt-3">This is what running product looks like.</h2>
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {leadership.map((l) => (
            <div key={l.title} className="card-light reveal p-7">
              <div className="text-[1.1rem] font-semibold">{l.title}</div>
              <div className="mt-1 text-[0.9rem] opacity-70">{l.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section id="philosophy" className="chapter ground-dark">
      <div className="wrap max-w-[840px]">
        <p className="eyebrow reveal">Design philosophy</p>
        <h2 className="h-chapter reveal mt-4">
          Make complex systems feel effortless.{" "}
          <span className="opacity-50">Subtract until only the essential remains.</span>
        </h2>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="chapter ground-light">
      <div className="wrap">
        <p className="eyebrow reveal">Skills</p>
        <h2 className="h-chapter reveal mt-3">Range, organised.</h2>
        <div className="mt-11 grid gap-4 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.cluster} className="card-light reveal p-7">
              <div className="text-[1.1rem] font-semibold">{s.cluster}</div>
              <div className="mt-1 text-[0.9rem] opacity-70">{s.items}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Technologies() {
  return (
    <section id="technologies" className="chapter ground-light-alt">
      <div className="wrap">
        <p className="eyebrow reveal">Technologies</p>
        <h2 className="h-chapter reveal mt-3">The tools behind the work.</h2>
        {/* Names printed, always visible — no hover-reveal (docs/11 Ch.11) */}
        <div className="reveal mt-10 flex flex-wrap gap-3">
          {technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#d8d2c4] bg-pearl px-4 py-2 text-[0.85rem]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Recognition() {
  return (
    <section id="recognition" className="chapter ground-light">
      <div className="wrap">
        <p className="eyebrow reveal">Recognition</p>
        <h2 className="h-chapter reveal mt-3">Rigor, certified.</h2>
        <div className="mt-11 space-y-3">
          {recognition.map((r) => (
            <div
              key={r.title}
              className="card-light reveal flex flex-wrap items-baseline justify-between gap-2 px-7 py-5"
            >
              <div className="font-semibold">{r.title}</div>
              <div className="mono-label !text-[0.7rem]">
                {r.org}
                {r.year && ` · ${r.year}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="chapter ground-light-alt">
      <div className="wrap grid items-center gap-12 md:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="eyebrow reveal">About</p>
          <h2 className="h-chapter reveal mt-3 max-w-[13ch]">
            From a receipt printer to a nation&apos;s sportsbook.
          </h2>
        </div>
        <div className="reveal space-y-4 opacity-80">
          <p>
            I built my first Windows application at twelve — a VHS-rental system in Estonia
            that handled its own UI, front end, back end, and printed its own receipts. That
            instinct never changed:{" "}
            <strong>make complex systems feel effortless for the people using them.</strong>
          </p>
          <p>
            I studied Information Technology (IATI, Estonia) and spent fourteen years scaling
            that instinct across Tier 1 operators in Europe, Canada and the USA — from CRM and
            UX craft, to design systems, to owning product and platform strategy.
          </p>
          <p>
            In 2025 Fitzdares relocated me to Gibraltar to set up its operation there —
            standing up a new platform under a Gibraltarian licence, from the ground up.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="chapter ground-dark-alt">
      <div className="wrap text-center">
        <p className="eyebrow reveal">Contact</p>
        <h2 className="h-chapter reveal mt-3">
          Let&apos;s build something
          <br />
          at Tier 1 standard.
        </h2>
        <div className="reveal mt-8">
          <a className="btn-primary" href="mailto:pokacity@gmail.com">
            Start a conversation →
          </a>
        </div>
        <div
          className="reveal mt-7 flex flex-wrap justify-center gap-6 text-[0.74rem] opacity-70"
          style={{ fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.06em" }}
        >
          <a className="link-quiet" href="mailto:pokacity@gmail.com">pokacity@gmail.com</a>
          <a className="link-quiet" href="https://www.linkedin.com/in/prolisko" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="link-quiet" href="#hero">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
