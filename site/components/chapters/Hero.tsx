/** Chapter 1 — Hero. The 3D backdrop is the global SceneLayer (hero state). */
export default function Hero() {
  return (
    <section id="hero" className="chapter ground-dark-alt">
      <div className="wrap grid items-center gap-8 md:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="eyebrow reveal">Head of Product · Sportsbook · Casino · Live Casino</p>
          <h1 className="h-hero reveal mt-5">
            Senior Product
            <br />
            Design Leader for
            <br />
            <span className="grad-accent">iGaming &amp; Sportsbook.</span>
          </h1>
          <p className="lead reveal mt-6 max-w-[36ch]">
            Fourteen years turning platform complexity into effortless products for Tier 1
            operators — now Head of Product at Fitzdares, building from Gibraltar.
          </p>
          <div
            className="reveal mt-10 inline-flex items-center gap-2.5 text-[0.7rem] uppercase opacity-60"
            style={{ fontFamily: "var(--font-jbmono), monospace", letterSpacing: "0.2em" }}
          >
            Scroll <span className="cue-dot" />
          </div>
        </div>
        <div aria-hidden="true" />
      </div>
    </section>
  );
}
