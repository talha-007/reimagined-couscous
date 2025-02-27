import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./button";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import coinsIcon from "../assets/icons/Coins.svg";
import Bell from "../assets/icons/Bell.svg";
import { FaChevronDown } from "react-icons/fa";
import userImage from "../assets/users/image4.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const isLoggedIn = true;
  const [isOpen, setIsOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which item is hovered
  const [activeIndex, setActiveIndex] = useState("Home"); // Track active item
  console.log(activeIndex);

  useEffect(() => {
    const path = location.pathname.replace("/", "").replace("-", " ");
    setActiveIndex(path || "Home");
  }, [location.pathname]);
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
            {[
              "Home",
              "Pixel Grid",
              isLoggedIn && "Buy Grid",
              "Marketplace",
            ].map((item, index) => {
              return (
                <motion.a
                  key={index}
                  // href={`#${id}`} // Scroll to section
                  className={`relative font-[Montserrat] cursor-pointer text-[16px] ${
                    activeIndex.toLowerCase() === item.toLowerCase()
                      ? "text-[#FFE395]"
                      : "text-white"
                  }`}
                  whileHover={{ scale: 1.1, color: "#FFE395" }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => {
                    if (activeIndex !== item) {
                      setActiveIndex(item);
                      navigate(`/${item.toLowerCase().replace(/\s+/g, "-")}`);
                    }
                  }}
                >
                  {item}
                </motion.a>
              );
            })}
          </div>
          {isLoggedIn ? (
            <div className="flex gap-4 items-center relative">
              <div>
                <img src={coinsIcon} alt="Coins" />
              </div>
              <div>
                <img src={Bell} alt="Notifications" />
              </div>
              {/* User Image and Dropdown */}
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaChevronDown
                    className="text-white transition-transform"
                    style={{
                      transform: isDropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                  <div className="relative w-10 h-10  p-[1px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#FFF8C5] before:to-[#8C5E1C]  before:-z-10">
                    <img
                      src={userImage}
                      alt="User"
                      className="w-full h-full "
                    />
                  </div>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <ul className="text-black">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Settings
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <div className="md:flex hidden items-center gap-4">
              <CustomButton
                py="py-2"
                onClick={() => navigate("/sign-up")}
                hidden="hidden"
                name="Get Started for $1"
                bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
              />
              <CustomButton
                onClick={() => navigate("/sign-in")}
                py="py-2"
                hidden="hidden"
                name="Sign in"
                bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
              />
            </div>
          )}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#FFE395] z-60"
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
            className="md:hidden bg-black bg-opacity-40 shadow-lg absolute top-0 h-screen left-0 w-full px-4 py-3 flex flex-col items-center justify-center z-50"
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
            {["Home", "Pixel Grid", "Marketplace"].map((item, index) => {
              return (
                <motion.a
                  key={index}
                  // href={`#${id}`} // Scroll to section
                  className={`relative font-[Montserrat] text-[16px] ${
                    activeIndex === item ? "text-[#FFE395]" : "text-white"
                  }`}
                  whileHover={{ scale: 1.1, color: "#FFE395" }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => {
                    setActiveIndex(item);
                    setIsOpen(!isOpen);
                    navigate(`/${item.toLowerCase().replace(/\s+/g, "-")}`);
                  }}
                >
                  {item}
                </motion.a>
              );
            })}
            <div className="flex items-center gap-4">
              <CustomButton
                py="py-2"
                hidden="hidden"
                name="Get Started for $1"
                bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
              />
              <CustomButton
                onClick={() => navigate("/sign-in")}
                py="py-2"
                hidden="hidden"
                name="Sign in"
                bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
              />
            </div>
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
