import { motion } from "framer-motion"; // Import motion from framer-motion
import image1 from "../assets/image1.png";
import image3 from "../assets/globe.png";
import image2 from "../assets/image2.png";
import image4 from "../assets/image3.png";

const Features = () => {
  const items = [
    {
      title: "Claim Your Space",
      text: "Secure your exclusive pixel spot and establish your presence in a world of influencers.",
      image: image1,
      colSpan: "col-span-1",
      textLeft: true,
      glow: true,
    },
    {
      title: "Global Visibility",
      text: "Be seen. Be recognized. Gain worldwide exposure on a platform designed for impact.",
      image: image3,
      colSpan: "lg:col-span-2 sm:col-span-1",
      textLeft: true,
      right: true,
      bottom: true,
    },
    {
      title: "Community-Driven",
      text: "Join the dynamic network of brands, creators, and influencers shaping the digital landscape.",
      image: image2,
      colSpan: "lg:col-span-2 sm:col-span-1",
      textLeft: true,
      right: true,
      bottom: true,
    },
    {
      title: "Affordable Entry",
      text: "Stay noticed and extend your influence with minimal effort.",
      image: image4,
      colSpan: "col-span-1",
      textLeft: true,
    },
  ];

  return (
    <div
      className="max-w-7xl w-full mx-auto relative px-4 overflow-hidden"
      id="features"
    >
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h1 className="bg-gradient-to-r from-[#B48B34] via-[#E8C776] to-[#A67921] bg-clip-text text-transparent font-[Montserrat] font-extrabold lg:text-[36px] sm:text-[24px] text-[24px] uppercase">
          WHY BECOME A MILLION DOLLAR INFLUENCER?
        </h1>
        <p className="text-white font-[Montserrat] mt-2 lg:text-[24px] sm:text-[20px] text-[16px]">
          Join an exclusive global network of influencers. Claim your space,
          amplify your brand, and unlock elite opportunities to connect,
          collaborate, and expand your influence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[5rem]">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative min-h-[372px] flex flex-col justify-end border border-transparent overflow-hidden ${item.colSpan} w-full`}
            style={{
              borderImage: "linear-gradient(to right, #7A5018cc, #FEEA9Acc) 1",
            }}
          >
            {item.glow && (
              <div
                className="absolute bottom-[0px] right-[0px] w-[150px] h-[150px] rounded-full bg-[#B48B34] blur-[100px] opacity-50"
                style={{
                  boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
                }}
              ></div>
            )}
            <div
              className={`${
                item.right ? "justify-end" : "justify-center"
              } absolute inset-x-0 ${
                item.bottom ? "top-unset  bottom-0" : "top-[4rem]"
              } flex`}
            >
              <img
                src={item.image}
                alt=""
                className={`${item.right ? "" : "mx-auto"}`}
              />
            </div>
            <motion.div
              className={`text-left ${
                item.textLeft ? "pl-[2rem] sm:pl-[3rem]" : "pr-4 sm:pr-12"
              } ${
                item.bottom ? "pb-[15rem] sm:pb-[2rem]" : "pb-[2rem]"
              } max-w-[380px]`}
              initial={{ opacity: 0, y: 30 }} // Initial state
              whileInView={{ opacity: 1, y: 0 }} // Animate when in view
              transition={{ duration: 0.5, ease: "easeOut" }} // Transition properties
              viewport={{ once: false, amount: 0.2 }} // Trigger on 20% visibility
            >
              <h1 className="bg-gradient-to-r from-[#B48B34] via-[#E8C776] to-[#A67921] bg-clip-text text-transparent font-[Montserrat] font-extrabold text-[24px] uppercase">
                {item.title}
              </h1>
              <p className="text-white font-[Montserrat] font-light mt-2 text-base uppercase">
                {item.text}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
