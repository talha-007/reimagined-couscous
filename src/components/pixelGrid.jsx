import grid from "../assets/grid.png";
import gridMobile from "../assets/grid-m.png";

const PixelGrid = () => {
  return (
    <>
      <div className="bg-black text-white lg:py-8 py-4 relative text-center lg:text-[32px] text-[14px] font-[Montserrat]">
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #FFE395 50%, transparent 100%)",
          }}
        />
        Claim your space, share your vision, and let every pixel amplify your
        impact
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, #FFE395 50%, transparent 100%)",
          }}
        />
      </div>
      <div className="max-w-7xl w-full mx-auto px-4 lg:my-[10rem] md:my-[8rem] sm:my-[4rem] my-[2rem]">
        <div className="text-center">
          <h1
            style={{
              backgroundImage:
                "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Montserrat",
              fontWeight: "900",
              fontSize: "2rem",
              textTransform: "uppercase",
            }}
          >
            Your pixel grid
          </h1>
          <p className="text-white font-[Montserrat] mt-[.5rem] text-[24px]">
            Where you claim your space and resides, amplify and share your
            vision
          </p>
        </div>
        <div
          className="hidden md:block" // Hide mobile image and show grid on larger screens
          style={{
            backgroundImage: `url(${grid})`,
            height: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            marginTop: "2rem",
          }}
        />
        <div
          className="md:hidden" // Show mobile image on smaller screens
          style={{
            backgroundImage: `url(${gridMobile})`,
            height: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            marginTop: "2rem",
          }}
        />
      </div>
    </>
  );
};

export default PixelGrid;
