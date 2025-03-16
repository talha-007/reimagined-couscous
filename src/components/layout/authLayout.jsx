import herobg from "../../assets/herobg.png";
import worldSvg from "../../assets/world.svg";
import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="relative h-screen flex items-center  "
      style={{
        backgroundImage: `linear-gradient(to left, #000000e6  50%, rgba(0, 0, 0, 0.0)100%), url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full items-center">
        {/* Left Side - Form */}
        {children}

        <div
          className="h-full w-full justify-center border-l col-span-2  overflow-hidden hidden md:flex"
          style={{
            borderLeft: "1px solid",
            borderImage: "linear-gradient(to bottom, #7A5018cc, #FEEA9Acc) 1",
          }}
        >
          <div className="flex flex-col justify-center items-center text-center ">
            <div
              style={{
                backgroundImage: `url(${worldSvg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                height: "65vh",
                width: "80vw",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-[16px] lg:text-[24px]  uppercase mb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Montserrat",
                  fontWeight: "800",
                }}
              >
                Go Global, Amplify Your Influence!
              </motion.h1>
              <p className="text-white font-[Montserrat] font-light uppercase">
                Take your influence worldwide and <br /> make your mark on a
                global stage.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
