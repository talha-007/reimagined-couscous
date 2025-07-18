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
  disabled,
  px,
  text,
  isLoading,
}) => {
  return (
    <motion.button
      className={`${hidden} md:block ${width} text-black ${text} font-bold ${
        px ? px : "px-8"
      }  ${py} transition-all duration-500 bg-[length:200%] bg-left relative `}
      style={{
        fontFamily: "InterCal Sans, sans-serif",
        background: bgGradient,
        backgroundSize: "200% 100%",
        backgroundPosition: "center",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      whileHover={{ backgroundPosition: "left" }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
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

      {isLoading ? "loading..." : name}
    </motion.button>
  );
};

export default CustomButton;
