import { work } from "@/data/content";
import ProductViz from "@/components/work/ProductViz";

/** Chapter 7 — Featured Work: code-drawn 3D product vignettes, free-floating
 *  on the chapter ground (no screenshot, no card background). */
export default function Work() {
  return (
    <section id="work" className="chapter ground-dark-alt">
      <div className="wrap">
        <p className="eyebrow reveal">Featured work · Sportsbook</p>
        <h2 className="h-chapter reveal mt-3">The products, up close.</h2>
        <div className="mt-8 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {work.map((w, i) => (
            <div key={w.title} className="reveal">
              <ProductViz kind={w.kind} index={i} />
              <div className="mt-5">
                <div className="mono-label !opacity-100 text-champagne">{w.tag}</div>
                <div className="mb-1 mt-1.5 text-[1.25rem]" style={{ fontFamily: "var(--font-display)" }}>
                  {w.title}
                </div>
                <div className="max-w-[46ch] text-[0.9rem] opacity-70">{w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
