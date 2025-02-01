import { motion } from "framer-motion";

const CustomButton = ({ name }) => {
  return (
    <motion.button
      className="hidden md:block text-black font-bold px-8 py-2 transition-all duration-500 bg-[length:200%] bg-left relative"
      style={{
        fontFamily: "Cal Sans, sans-serif",
        background:
          "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
      whileHover={{ backgroundPosition: "left" }}
      whileTap={{ scale: 0.9 }}
    >
      <span
        className="absolute inset-0 border-2 "
        style={{
          borderImageSource:
            "linear-gradient(to right, #7A5018 0%, #FEEA9A 100%)",
          borderImageSlice: 1,
        }}
      />
      {name}
    </motion.button>
  );
};

export default CustomButton;
