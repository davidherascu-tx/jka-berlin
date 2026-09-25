import type { Metadata } from "next";
import Slider from "./components/Slider";
import Intro from "./components/Intro";
import News from "./components/News";
import ShobuBanner from "./components/ShobuBanner";
import { ORGANIZATION_JSON_LD, jsonLd } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Inhalte kommen aus Sanity – immer frisch rendern, damit neue Eintraege
// sofort erscheinen (statt beim Build eingefroren zu werden).
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(ORGANIZATION_JSON_LD) }}
      />
      <Slider />
      <Intro />
      <News />
      <ShobuBanner />
    </>
  );
}
