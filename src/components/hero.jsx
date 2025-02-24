import { motion } from "framer-motion"; // Import framer-motion
import mobileBg from "../assets/mobile pattern.png";
import herobg from "../assets/herobg.png";
import CustomButton from "./button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
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
        {/* Mobile background overlay */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: `url(${mobileBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        ></div>

        <div className="max-w-7xl w-full mx-auto relative z-10">
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
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Make Every Pixel Count
              </motion.h1>
              <motion.h1
                className="font-montserrat font-semibold text-white sm:text-[32px] text-[26px] uppercase"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                Amplify Your Influence Today
              </motion.h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <CustomButton
                py="py-4"
                hidden="block"
                name="Get Started for $1"
                onClick={() => navigate("/sign-in")}
                bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
              />
              <CustomButton
                bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                py="py-2"
                hidden="hidden"
                onClick={() => navigate("/pixel-grid")}
                name="View Pixel Grid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
