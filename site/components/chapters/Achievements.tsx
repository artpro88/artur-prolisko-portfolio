import { achievements } from "@/data/content";

/** Chapter 6 — Major Achievements. Labels + context always visible (docs/08 §5a). */
export default function Achievements() {
  return (
    <section id="achievements" className="chapter ground-light-alt">
      <div className="wrap">
        <p className="eyebrow reveal">Major achievements</p>
        <h2 className="h-chapter reveal mt-3">Impact you can measure.</h2>
        <div className="mt-11 grid grid-cols-2 gap-4 md:grid-cols-6">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={`card-light reveal p-7 ${
                a.hero
                  ? "col-span-2 md:col-span-3 bg-gradient-to-br from-[#fbf9f3] to-[#f0e7cf]"
                  : "col-span-1 md:col-span-2"
              }`}
            >
              <div className="mono-label mb-3.5">{a.label}</div>
              <div
                className={`metric-n ${
                  a.hero
                    ? "text-[clamp(2.4rem,6vw,4.4rem)] text-gold-soft"
                    : "text-[2.1rem] text-bordeaux"
                }`}
              >
                {a.metric}
              </div>
              <div className="mt-2 text-[0.86rem] opacity-70">{a.context}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
