import "./App.css";
import ContactUs from "./components/contactUs";
import Faq from "./components/faq";
import Features from "./components/features";
import Footer from "./components/footer";
import { motion, useAnimation } from "framer-motion";
import Hero from "./components/hero";
import HowItWorks from "./components/howItWorks";
import Navbar from "./components/navbar";
import PixelGrid from "./components/pixelGrid";
import PlatformInAction from "./components/platformInAction";
import { useEffect, useState } from "react";

function AnimatedSection({ id, children }) {
  const controls = useAnimation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash.substring(1)); // Get the hash without #
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Call it initially in case the page loads with a hash

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (activeSection === id) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [activeSection, controls, id]);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* Global Glowing Circles */}
        <div
          className="absolute bottom-[75%] left-[-30%] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
          style={{
            boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
          }}
        ></div>
        <div
          className="absolute bottom-[30%] left-[-250px] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[350px] opacity-50 -z-10"
          style={{
            boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
          }}
        ></div>
        <div
          className="absolute bottom-[50%] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
          style={{
            boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
          }}
        ></div>
        <div
          className="absolute bottom-[550px] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
          style={{
            boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
          }}
        ></div>

        {/* Main Sections */}
        <Navbar />
        {/* Sections with animations triggered on scroll & navbar clicks */}
        <AnimatedSection id="home">
          <Hero />
        </AnimatedSection>

        <AnimatedSection id="pixel-grid">
          <PixelGrid />
        </AnimatedSection>

        <AnimatedSection id="features">
          <Features />
        </AnimatedSection>

        <AnimatedSection id="how-it-works">
          <HowItWorks />
        </AnimatedSection>

        <AnimatedSection id="platform-in-action">
          <PlatformInAction />
        </AnimatedSection>

        <AnimatedSection id="faq">
          <Faq />
        </AnimatedSection>

        <AnimatedSection id="contact-us">
          <ContactUs />
        </AnimatedSection>

        <Footer />
      </div>
    </>
  );
}

export default App;
