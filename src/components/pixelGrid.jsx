import { motion } from "framer-motion";
import { useRef } from "react";
import grid from "../assets/grid.png";
import gridMobile from "../assets/grid-m.png";

const PixelGrid = () => {
  const ref = useRef(null);

  return (
    <div className="relative">
      {/* Animated Header Section */}
      <motion.div
        className="bg-black text-white lg:py-6 py-4 relative text-center lg:text-[32px] md:text-[24px] sm:text-[16px] text-[14px] font-[Montserrat]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #FFE395cc 50%, transparent 100%)",
          }}
        />
        Claim your space, share your vision, and let every pixel amplify your
        impact
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #FFE395cc 50%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Main Content */}
      <div
        ref={ref}
        className="max-w-7xl w-full mx-auto px-4 lg:my-[10rem] md:my-[8rem] sm:my-[4rem] my-[2rem]"
      >
        <div className="text-center">
          {/* Animated Title */}
          <motion.h1
            style={{
              backgroundImage:
                "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Montserrat",
              fontWeight: "900",
              fontSize: "2rem",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            Your pixel grid
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="text-white font-[Montserrat] mt-[.5rem] text-[24px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            Where you claim your space and resides, amplify and share your
            vision
          </motion.p>
        </div>

        {/* Grid Image Sections */}
        <div
          className="hidden md:block"
          style={{
            backgroundImage: `url(${grid})`,
            height: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            marginTop: "2rem",
          }}
        />
        <div
          className="md:hidden"
          style={{
            backgroundImage: `url(${gridMobile})`,
            height: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            marginTop: "2rem",
          }}
        />
      </div>
    </div>
  );
};

export default PixelGrid;
