import { motion } from "framer-motion"; // Import framer-motion
import spotlight from "../assets/spotlight.png";
import herobg from "../assets/herobg.png";
import CustomButton from "./button";

const Hero = () => {
  return (
    <div className="pt-20">
      <div
        className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="max-w-[700px] flex flex-col gap-[2.5rem] sm:items-start items-center">
            <div className="flex flex-col text-center sm:text-left gap-[1rem]">
              <motion.h1
                className="text-[36px] lg:text-[4rem] leading-[1.2] lg:leading-[100px] uppercase"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Montserrat",
                  fontWeight: "800",
                }}
                initial={{ opacity: 0, y: -50 }} // Initial state
                animate={{ opacity: 1, y: 0 }} // Final state
                transition={{ duration: 0.8, ease: "easeOut" }} // Animation properties
              >
                Make Every Pixel Count
              </motion.h1>
              <motion.h1
                className="font-montserrat font-semibold text-white sm:text-[32px] text-[26px] uppercase"
                initial={{ opacity: 0, y: -50 }} // Initial state
                animate={{ opacity: 1, y: 0 }} // Final state
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Animation properties with delay
              >
                Amplify Your Influence Today
              </motion.h1>
            </div>
            <CustomButton py="py-4" hidden="block" name="Get Started for $1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
