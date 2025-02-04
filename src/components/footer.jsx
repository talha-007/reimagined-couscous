import { BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="border border-t-[#333333cc] relative overflow-hidden h-[348px]">
      <div className=" max-w-7xl w-full mx-auto relative px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 text-center gap-2 py-[3rem]">
          <div className="flex flex-col">
            <motion.div
              className="flex justify-center sm:justify-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={logo} alt="logo" />
            </motion.div>
          </div>
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <ul className="text-white space-y-3 text-left w-fit mx-auto sm:mx-[unset]">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFE395] font-[Inter] text-[16px] transition duration-300"
                  >
                    Pricing
                  </a>
                </li>
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
            <p>© 2025 Milllion Dollar infuencers. All right reserved.</p>
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
