import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./button";
import logo from "../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import coinsIcon from "../assets/icons/Coins.svg";
import Bell from "../assets/icons/Bell.svg";
import { FaChevronDown } from "react-icons/fa";
import userImage from "../assets/users/dummy.png";

import close from "../assets/icons/close btn.svg";
import { IconButton } from "@material-tailwind/react";
import grid from "../assets/icons/grid.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slice/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const isLoggedIn = localStorage.getItem("token");
  // console.log("isloggedin", isLoggedIn);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrDropdownOpen, setIsCurrDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which item is hovered
  const [activeIndex, setActiveIndex] = useState(""); // Track active item

  const currDropdownRef = useRef(null);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const profileData = useSelector((s) => s?.user?.data?.data);
  // console.log("profileData", profileData);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      await dispatch(getUserProfile());
    } catch (error) {
      console.log(error);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (currDropdownRef.current &&
          !currDropdownRef.current.contains(event.target)) ||
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
        (notificationRef.current &&
          !notificationRef.current.contains(event.target))
      ) {
        setIsCurrDropdownOpen(false);
        setIsDropdownOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            {["Home", "Pixel Grid", isLoggedIn && "Buy Grid", "Marketplace"]
              .filter(Boolean) // Remove falsy values (if isLoggedIn is false)
              .map((item, index) => {
                const isActive =
                  activeIndex.toLowerCase() === item.toLowerCase();
                return (
                  <motion.a
                    key={index}
                    className={`relative font-[Montserrat] cursor-pointer text-[16px] ${
                      isActive ? "text-[#FFE395]" : "text-white"
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
                    {activeIndex.toLowerCase() === item.toLowerCase() && (
                      <span className="absolute left-1/2 -bottom-2 h-1 w-1  bg-[#FFE395] transform -translate-x-1/2"></span>
                    )}
                  </motion.a>
                );
              })}
          </div>

          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex gap-4 items-center relative">
                <div
                  onClick={() => {
                    setIsCurrDropdownOpen(!isCurrDropdownOpen);
                  }}
                  className="hidden md:flex items-center gap-[10px]"
                >
                  <img src={coinsIcon} alt="Coins" />
                  <p className="text-[#FEDF7A] font-[Inter] text-[16px] ">
                    {profileData?.coins ? profileData?.coins : "0"}
                  </p>
                </div>
                <div onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                  <img src={Bell} alt="Notifications" />
                </div>
                {/* User Image and Dropdown */}
                <div className="relative hidden md:block">
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
                    <div className="relative w-10 h-10  p-[1px] before:absolute before:inset-0  before:-z-10">
                      <img
                        src={
                          profileData?.userImage
                            ? profileData?.userImage
                            : userImage
                        }
                        alt="User"
                        className="w-full h-full "
                      />
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  {isNotificationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      ref={notificationRef}
                      className="absolute  lg:w-[412px] md:w-[412px] w-max right-2 sm:right-4 md:right-6 lg:right-30 mt-7 p-[16px] bg-black shadow-lg overflow-hidden z-50 border"
                      style={{
                        borderImage:
                          "linear-gradient(to right, #ffe39554, #ffe39554) 1",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <motion.h1
                            className="text-[16px] lg:text-[24px]  uppercase"
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
                            Checkout
                          </motion.h1>
                          <IconButton className="bg-transparent">
                            <img src={close} alt="" />
                          </IconButton>
                        </div>
                        <div>
                          <div>
                            <img src={grid} alt="" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {isCurrDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      ref={currDropdownRef}
                      className="absolute lg:w-[356px] md:w-[256px] w-max right-2 sm:right-4 md:right-6 lg:right-30 mt-7 p-[24px] bg-black shadow-lg overflow-hidden z-50 border"
                      style={{
                        borderImage:
                          "linear-gradient(to right, #ffe39554, #ffe39554) 1",
                      }}
                    >
                      <div>
                        <div
                          className="bg-[#35353540]  py-[16px] px-[16px] flex items-center justify-between mb-6"
                          style={{ border: "1px solid #feea9a14" }}
                        >
                          <p className="text-[#FFE395] font-[Inter] font-light text-[16px]">
                            {" "}
                            Total Credits
                          </p>
                          <p className="text-[#fff] font-[Inter] text-[16px] font-bold flex items-center gap-2">
                            {" "}
                            <img src={coinsIcon} alt="Coins" />
                            7000
                          </p>
                        </div>
                        <CustomButton
                          py="py-2"
                          hidden="block"
                          name="Recharge"
                          width="w-full"
                          onClick={() => navigate("/profile")}
                          bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                          strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                        />
                      </div>
                    </motion.div>
                  )}
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      ref={dropdownRef}
                      className="absolute right-0 mt-7 p-[24px] min-w-[404px] bg-black shadow-lg overflow-hidden z-50 border"
                      style={{
                        borderImage:
                          "linear-gradient(to right, #ffe39554, #ffe39554) 1",
                      }}
                    >
                      <div>
                        {(profileData?.name ||
                          profileData?.userName ||
                          profileData?.userImage) && (
                          <div className="flex items-center gap-4 mb-8">
                            <div
                              style={{
                                backgroundImage: `url(${
                                  profileData?.userImage
                                    ? profileData?.userImage
                                    : ""
                                })`,
                                width: "148px",
                                height: "148px",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            <div className="flex flex-col gap-4">
                              <p className="text-[#FEDB6B] font-[Montserrat] font-bold text-[32px] w-max">
                                {profileData?.name ? profileData?.name : ""}
                              </p>
                              <p className="text-[#FEDB6B] font-[Montserrat] font-light text-[20px]">
                                {profileData?.userName
                                  ? profileData?.userName
                                  : ""}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-col md:flex-row gap-4 ">
                          <CustomButton
                            bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                            strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                            py="py-2"
                            hidden="hidden"
                            width="w-full"
                            name="Logout"
                            onClick={() => {
                              localStorage.removeItem("token");
                              setIsDropdownOpen(false);
                            }}
                          />
                          <CustomButton
                            py="py-2"
                            hidden="block"
                            name={
                              profileData?.role === "user"
                                ? "Get Started"
                                : "View Profile"
                            }
                            width="w-full"
                            onClick={() =>
                              navigate(
                                profileData?.role === "user"
                                  ? "/buy-grid"
                                  : "/profile"
                              )
                            }
                            bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                            strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="md:flex hidden items-center gap-4">
                <CustomButton
                  py="py-2"
                  onClick={() =>
                    navigate(isLoggedIn ? "/buy-grid" : "/sign-up")
                  }
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
            <div className="flex items-center gap-4 mt-8">
              <CustomButton
                py="py-2"
                hidden="hidden"
                name="Get Started for $1"
                onClick={() => navigate("/buy-grid")}
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
