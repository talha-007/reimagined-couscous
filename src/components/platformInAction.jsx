import { useRef, useState } from "react";
import videoImage from "../assets/image4.png";
import playIcon from "../assets/icon5.svg";
import { motion } from "framer-motion";

const PlatformInAction = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-7xl w-full mx-auto relative px-4">
      <motion.div
        className="text-center sm:text-left"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h1
          className="text-[24px] sm:text-[36px] uppercase"
          style={{
            backgroundImage:
              "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Montserrat",
            fontWeight: "800",
          }}
        >
          Watch the Platform in Action!
        </h1>
        <p className="text-white text-[16px] sm:text-[24px] font-normal font-[Montserrat]">
          Watch the platform's video tutorial to easily understand how it works.
        </p>
      </motion.div>
      {/* Video Section */}
      <div className="relative mt-[40px]">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-auto shadow-lg"
          controls={isPlaying}
          poster={videoImage}
          onPlay={() => setIsPlaying(true)}
        >
          <source src="/path-to-your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay (Only Show if Not Playing) */}
        {!isPlaying && (
          <button
            className="absolute inset-0 flex justify-center items-center"
            onClick={handlePlay}
          >
            <div
              style={{
                borderImage:
                  "linear-gradient(to right, #FEEA9Acc, #7A5018cc) 1",
              }}
              className="flex justify-center items-center bg-gradient-to-b border border-transparent from-[rgba(254,246,192,0.15)] to-[rgba(232,200,118,0.53)]  w-16 h-16"
            >
              <img src={playIcon} alt="play-icon" className="w-8 h-8" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default PlatformInAction;
