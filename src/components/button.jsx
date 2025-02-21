import { motion } from "framer-motion";

const CustomButton = ({
  name,
  hidden,
  py,
  bgGradient,
  strokeGradient,
  onClick,
  width,
  icon,
}) => {
  return (
    <motion.button
      className={`${hidden} md:block text-black font-bold px-8 ${py} transition-all duration-500 bg-[length:200%] bg-left relative `}
      style={{
        fontFamily: "Cal Sans, sans-serif",
        background: bgGradient,
        backgroundSize: "200% 100%",
        backgroundPosition: "center",
        cursor: "pointer",
        width: width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      whileHover={{ backgroundPosition: "left" }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <span
        className="absolute inset-0 border-2 "
        style={{
          borderImageSource: strokeGradient,
          borderImageSlice: 1,
        }}
      />
      {icon && (
        <>
          <img src={icon} alt="icon" />
        </>
      )}
      {name}
    </motion.button>
  );
};

export default CustomButton;
