import { brands } from "@/data/content";

/** Chapter 3 — Brands. All info visible at rest; hover only lifts (docs/08 §5a). */
export default function Brands() {
  return (
    <section id="brands" className="chapter ground-dark">
      <div className="wrap">
        <p className="eyebrow reveal">Brands I&apos;ve worked with</p>
        <h2 className="h-chapter reveal mt-3">Trusted with the products behind the industry.</h2>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {brands.map((b) => (
            <div
              key={b.name}
              className="card-dark reveal flex flex-col gap-4 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="logo-chip h-[74px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.logo} alt={b.name} />
              </div>
              <div>
                <div className="mono-label !opacity-100 text-champagne">{b.meta}</div>
                <div className="mt-1 text-[0.95rem] font-semibold">{b.role}</div>
                <div className="mt-1 text-[0.86rem] opacity-70">{b.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
