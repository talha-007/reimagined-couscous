import { motion } from "framer-motion"; // Import framer-motion

const SelectPixels = () => {
  return (
    <div className="max-w-5xl w-full mx-auto relative z-10 font-[Montserrat]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="text-[16px] font-bold lg:text-[24px] leading-[1.2] lg:leading-[20px] uppercase"
          style={{
            backgroundImage:
              "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Select pixels
        </h1>
        <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
          Choose the pixels you want to buy—simply drag to select.
        </p>
      </motion.div>
      ;
    </div>
  );
};

export default SelectPixels;
