import CustomButton from "../button";
import logo from "../../assets/logo.png";
import googleIcon from "../../assets/google.svg";
import { motion } from "framer-motion";

import AuthLayout from "../layout/authLayout";

const Signup = () => {
  return (
    <AuthLayout>
      <div className="flex items-center justify-center">
        <div className=" p-8 w-full max-w-md">
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <a href="/">
              <img src={logo} alt="logo" />
            </a>

            <h1
              className="text-[24px] lg:text-[36px] leading-[1.2] lg:leading-[100px] uppercase"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Montserrat",
                fontWeight: "800",
              }}
            >
              Welcome
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col mb-4">
              <label className="text-white font-medium mb-1 text-[14px] uppercase">
                Email
              </label>
              <input
                type="email"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-white font-medium mb-1 text-[14px] uppercase">
                Password
              </label>
              <input
                type="password"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-white font-medium mb-1 text-[14px] uppercase">
                Confirm Password
              </label>
              <input
                type="password"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="flex flex-col items-center gap-6">
              <CustomButton
                bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                py="py-4"
                hidden="block"
                name="Login"
                width="100%"
              />
              <p className="text-white">
                Already have an account?{" "}
                <span className="text-[#FFE395] font-[Montserrat] font-light">
                  {" "}
                  <a href="/sign-in">login</a>
                </span>
              </p>
              <CustomButton
                bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                py="py-4"
                hidden="block"
                name="Countinue with Google"
                icon={googleIcon}
                width="100%"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
