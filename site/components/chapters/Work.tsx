import Image from "next/image";
import { work } from "@/data/content";

/** Chapter 7 — Featured Work: Artur's real product screenshots (docs/asset-inventory.md). */
export default function Work() {
  return (
    <section id="work" className="chapter ground-dark-alt">
      <div className="wrap">
        <p className="eyebrow reveal">Featured work · Sportsbook</p>
        <h2 className="h-chapter reveal mt-3">The products, up close.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {work.map((w) => (
            <div key={w.title} className="reveal overflow-hidden rounded-[18px] border border-[#22262f] bg-gradient-to-b from-[#15161c] to-[#0e0f14]">
              <div className="relative aspect-[16/10] bg-[#0a0b0f]">
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="px-6 pb-6 pt-5">
                <div className="mono-label !opacity-100 text-champagne">{w.tag}</div>
                <div className="mb-1 mt-1.5 text-[1.25rem]" style={{ fontFamily: "var(--font-display)" }}>
                  {w.title}
                </div>
                <div className="text-[0.9rem] opacity-70">{w.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
