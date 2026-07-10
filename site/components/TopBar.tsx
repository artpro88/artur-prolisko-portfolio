export default function TopBar() {
  return (
    <header className="topbar">
      <div
        className="text-[1.15rem] font-semibold tracking-[0.02em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        AP
      </div>
      <nav
        className="hidden gap-[26px] text-[0.76rem] tracking-[0.04em] md:flex"
        style={{ fontFamily: "var(--font-jbmono), monospace" }}
      >
        <a className="opacity-75 hover:opacity-100" href="#work">Work</a>
        <a className="opacity-75 hover:opacity-100" href="#timeline">Journey</a>
        <a className="opacity-75 hover:opacity-100" href="#achievements">Impact</a>
        <a className="opacity-75 hover:opacity-100" href="#contact">Contact</a>
      </nav>
    </header>
  );
}
