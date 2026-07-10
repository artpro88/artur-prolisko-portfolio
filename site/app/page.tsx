import SmoothScroll from "@/components/SmoothScroll";
import GroundFX from "@/components/GroundFX";
import RevealObserver from "@/components/RevealObserver";
import TopBar from "@/components/TopBar";
import Rail from "@/components/Rail";
import Hero from "@/components/chapters/Hero";
import Brands from "@/components/chapters/Brands";
import Timeline from "@/components/chapters/Timeline";
import Work from "@/components/chapters/Work";
import Achievements from "@/components/chapters/Achievements";
import {
  Intro,
  Journey,
  Leadership,
  Philosophy,
  Skills,
  Technologies,
  Recognition,
  About,
  Contact,
} from "@/components/chapters/Sections";

/** The story — 14 chapters, one continuous scroll (docs/06). */
export default function Home() {
  return (
    <SmoothScroll>
      <TopBar />
      <Rail />
      <RevealObserver />
      <GroundFX />
      <main>
        <Hero />
        <Intro />
        <Brands />
        <Journey />
        <Timeline />
        <Achievements />
        <Work />
        <Leadership />
        <Philosophy />
        <Skills />
        <Technologies />
        <Recognition />
        <About />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
