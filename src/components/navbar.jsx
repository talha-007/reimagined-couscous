import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./button";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which item is hovered
  const [activeIndex, setActiveIndex] = useState("Home"); // Track active item
  console.log(activeIndex);

  const handleMouseMove = (e) => {
    // Calculate cursor position relative to the menu items
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const isNear =
        e.clientX >= rect.left - 10 && // 10px padding
        e.clientX <= rect.right + 10 &&
        e.clientY >= rect.top - 10 &&
        e.clientY <= rect.bottom + 10;
      if (isNear) {
        setHoveredIndex(index); // Set the index of the hovered item
      }
    });
  };

  return (
    <nav className="fixed w-full bg-black bg-opacity-40 shadow-md z-50 py-4 px-4 ">
      <div className="max-w-7xl mx-auto  ">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
          {/* Desktop Nav Items */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {["Home", "How It Works", "Features", "Pricing"].map(
              (item, index) => {
                const id = item.toLowerCase().replace(/\s+/g, "-"); // Convert to valid `id`
                return (
                  <motion.a
                    key={index}
                    href={`#${id}`} // Scroll to section
                    className={`relative font-[Montserrat] text-[16px] ${
                      activeIndex === item ? "text-[#FFE395]" : "text-white"
                    }`}
                    whileHover={{ scale: 1.1, color: "#FFE395" }}
                    transition={{ type: "spring", stiffness: 200 }}
                    onClick={() => setActiveIndex(item)}
                  >
                    {item}
                  </motion.a>
                );
              }
            )}
          </div>

          <CustomButton py="py-2" hidden="hidden" name="Get Started for $1" />

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#FFE395] z-50"
            whileHover={{ scale: 1.2, rotate: 10, color: "#FFD700" }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              initial={{ rotate: 0, opacity: 1 }}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isOpen ? (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              ) : (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black bg-opacity-40 shadow-lg absolute top-0 h-screen left-0 w-full px-4 py-3 flex flex-col items-center justify-center"
            variants={{
              hidden: { opacity: 0, y: "-100%" },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeInOut" },
              },
              exit: { opacity: 0, y: "-100%", transition: { duration: 0.3 } },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseMove={handleMouseMove} // Track cursor movement
          >
            {["Home", "How It Works", "Features", "Pricing"].map(
              (item, index) => {
                const id = item.toLowerCase().replace(/\s+/g, "-"); // Convert to valid `id`
                return (
                  <motion.a
                    key={index}
                    href={`#${id}`} // Scroll to section
                    className={`relative font-[Montserrat] text-[16px] ${
                      activeIndex === item ? "text-[#FFE395]" : "text-white"
                    }`}
                    whileHover={{ scale: 1.1, color: "#FFE395" }}
                    transition={{ type: "spring", stiffness: 200 }}
                    onClick={() => {
                      setActiveIndex(item);
                      setIsOpen(!isOpen);
                    }}
                  >
                    {item}
                  </motion.a>
                );
              }
            )}
            <CustomButton py="py-2" hidden="hidden" name="Get Started for $1" />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, #FFE395 50%, transparent 100%)",
        }}
      />
    </nav>
  );
};

export default Navbar;
