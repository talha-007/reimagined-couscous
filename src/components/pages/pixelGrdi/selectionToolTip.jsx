import React from "react";
import { motion } from "framer-motion";

const SelectionToolTip = ({ tooltipPos }) => {
  return (
    <motion.div
      className="absolute bg-white text-black text-sm px-3 py-2 rounded shadow-lg"
      style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  );
};

export default SelectionToolTip;
