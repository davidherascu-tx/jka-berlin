import Slider from "./components/Slider";
import Intro from "./components/Intro";
import News from "./components/News";
import ShobuBanner from "./components/ShobuBanner";

// Inhalte kommen aus Sanity – immer frisch rendern, damit neue Eintraege
// sofort erscheinen (statt beim Build eingefroren zu werden).
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Slider />
      <Intro />
      <News />
      <ShobuBanner />
    </>
  );
}
