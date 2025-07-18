import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { motion, useAnimation } from "framer-motion";
import Hero from "../hero";
import PixelGrid from "../pixelGrid";
import Features from "../features";
import HowItWorks from "../howItWorks";
import PlatformInAction from "../platformInAction";
import Faq from "../faq";
import ContactUs from "../contactUs";
import { useLocation } from "react-router-dom";

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
      style={{ scrollMarginTop: "120px" }}
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
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        const yOffset = -96; // Navbar height: h-16 (64px) + py-4 (32px) = 96px
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location.state]);

  return (
    <div>
      <Layout>
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
      </Layout>
    </div>
  );
};

export default Home;
