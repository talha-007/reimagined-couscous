import "./App.css";
import Features from "./components/features";
import GlowingCircle from "./components/glowingCircle";
import Hero from "./components/hero";
import HowItWorks from "./components/howItWorks";
import Navbar from "./components/navbar";
import PixelGrid from "./components/pixelGrid";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PixelGrid />
      <div className="relative w-full overflow-hidden">
        <Features />
        <GlowingCircle />
      </div>
      <HowItWorks />
    </>
  );
}

export default App;
