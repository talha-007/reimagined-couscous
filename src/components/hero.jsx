import spotlight from "../assets/spotlight.png";
import herobg from "../assets/herobg.png";
import CustomButton from "./button";

const Hero = () => {
  return (
    <div className="pt-20">
      <div
        className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="max-w-[700px] flex flex-col gap-[2.5rem] sm:items-start items-center">
            <div className="flex flex-col text-center sm:text-left gap-[1rem]">
              <h1
                className="text-[36px] lg:text-[4rem] leading-[1.2] lg:leading-[100px] uppercase"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Montserrat",
                  fontWeight: "800",
                }}
              >
                Make Every Pixel Count
              </h1>
              <h1 className="font-montserrat font-semibold text-white sm:text-[32px] text-[24px] uppercase">
                Amplify Your Influence Today
              </h1>
            </div>
            <CustomButton py="py-4" hidden="block" name="Get Started for $1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
