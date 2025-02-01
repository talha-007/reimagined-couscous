import grid from "../assets/grid.png";

const PixelGrid = () => {
  return (
    <>
      <div className="bg-black text-white py-8 relative text-center text-2xl font-[Gilroy]">
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
      <div className="max-w-7xl w-full mx-auto my-[5rem]">
        <div className="text-center ">
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
          <p className="text-white font-[Montserrat] mt-[.5rem]">
            Where you claim your space and resides, amplify and share your
            vision
          </p>
        </div>
        <div
          style={{
            backgroundImage: `url(${grid})`,
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
