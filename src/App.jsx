import "./App.css";
import ContactUs from "./components/contactUs";
import Faq from "./components/faq";
import Features from "./components/features";
import Footer from "./components/footer";
import GlowingCircle from "./components/glowingCircle";
import Hero from "./components/hero";
import HowItWorks from "./components/howItWorks";
import Navbar from "./components/navbar";
import PixelGrid from "./components/pixelGrid";
import PlatformInAction from "./components/platformInAction";

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
      <PlatformInAction />
      <Faq />
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
