import Slider from "./components/Slider";
import Intro from "./components/Intro";
import News from "./components/News";
import ShobuBanner from "./components/ShobuBanner";

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
