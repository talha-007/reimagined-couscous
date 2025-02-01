import spotlight from "../assets/spotlight.png";
import herobg from "../assets/hero bg.png";
import CustomButton from "./button";

const Hero = () => {
  return (
    <div
      className="relative pt-20 h-screen flex items-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${spotlight})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="max-w-[700px] flex flex-col gap-[2.5rem] items-start">
          <div className="flex flex-col gap-[1rem]">
            <h1
              style={{
                backgroundImage:
                  "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Montserrat",
                fontWeight: "800",
                fontSize: "4.8rem",
                lineHeight: "100px",
              }}
            >
              Make Every Pixel Count
            </h1>
            <h1 className="font-montserrat font-semibold text-white text-[32px]">
              Amplify Your Influence Today
            </h1>
          </div>
          <CustomButton name="Get Started for $1" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
