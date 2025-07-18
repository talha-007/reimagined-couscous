import { BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";
import logo from "../assets/logo.svg";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const handleNav = (sectionId) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = `#${sectionId}`;
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <div className="border border-t-[#333333cc] relative overflow-hidden h-[300px]">
      <div className=" max-w-7xl w-full mx-auto relative px-4">
        <div className="flex flex-col items-center justify-center text-center gap-[3rem] pt-[4rem]">
          <div className="w-full flex justify-center ">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img style={{ width: "180px" }} src={logo} alt="logo" />
            </motion.div>
          </div>
          <div className="w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <ul className="text-white space-y-3 text-center flex gap-4">
                <li>
                  <button
                    onClick={() => handleNav("home")}
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300 bg-transparent border-none cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav("pixel-grid")}
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300 bg-transparent border-none cursor-pointer"
                  >
                    Pixel Grid
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav("how-it-works")}
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300 bg-transparent border-none cursor-pointer"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav("features")}
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300 bg-transparent border-none cursor-pointer"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      token ? navigate("/buy-pixel") : navigate("/sign-in")
                    }
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300 bg-transparent border-none cursor-pointer"
                  >
                    Buy Pixel
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:hello@milliondollarinfluencer.com"
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300 bg-transparent border-none cursor-pointer"
                  >
                    Partnership
                  </a>
                </li>
                {/* <li>
                  <button
                    onClick={() => handleNav("faq")}
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300 bg-transparent border-none cursor-pointer"
                  >
                    Pricing
                  </button>
                </li> */}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[-150px] left-[0px] w-[150px] h-[150px] rounded-full bg-[#B48B34] blur-[100px] opacity-50"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div className="sm:border sm:border-t-[#333333cc] absolute bottom-0 left-0 right-0">
        <div className="flex flex-col-reverse  sm:flex-row gap-6 items-center sm:justify-between max-w-7xl w-full mx-auto px-4 py-[1.5rem] ">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-[#ffffff79] text-center sm:text-left">
            <p>© 2025 Milllion Dollar Infuencer. All right reserved.</p>
            <div className="flex items-center gap-2">
              <a href="">Privacy Policy</a>
              <a href="">Terms of Service</a>
            </div>
          </div>
          <div className="text-[#ffffff79] flex items-center gap-3">
            <BsTwitter />
            <BsYoutube />
            <BsLinkedin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
