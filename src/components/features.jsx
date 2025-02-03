import image1 from "../assets/image1.png";
import image3 from "../assets/globe.png";
import image2 from "../assets/image2.png";
import image4 from "../assets/image3.png";

const Features = () => {
  const items = [
    {
      title: "Claim Your Space",
      text: "Secure your exclusive pixel spot and make it yours",
      image: image1,
      colSpan: "col-span-1",
      textLeft: true,
      glow: true,
    },
    {
      title: "Global Visibility",
      text: "Be part of a platform that showcases your presence to audiences worldwide.",
      image: image3,
      colSpan: "lg:col-span-2 sm:col-span-1",
      textLeft: true,
      right: true,
      bottom: true,
    },
    {
      title: "Community-Driven",
      text: "Join a growing ecosystem of brands, creators, and influencers sharing the grid.",
      image: image2,
      colSpan: "lg:col-span-2 sm:col-span-1",
      textLeft: true,
      right: true,
      bottom: true,
    },
    {
      title: "Affordable Entry",
      text: "A simple, cost-effective way to get noticed and amplify your reach.",
      image: image4,
      colSpan: "col-span-1",
      textLeft: true,
    },
  ];
  return (
    <div className="max-w-7xl w-full mx-auto relative px-4 overflow-hidden">
      <div className="text-center px-4">
        <h1 className="bg-gradient-to-r from-[#B48B34] via-[#E8C776] to-[#A67921] bg-clip-text text-transparent  font-[Montserrat] font-extrabold lg:text-[36px] sm:text-[24px] text-[24px] uppercase">
          why million dollar pixel grid
        </h1>
        <p className="text-white  font-[Montserrat] mt-2 lg:text-[24px] sm:text-[20px] text-[16px]">
          Join a global community of influencers for just $1 and unlock
          exclusive opportunities to connect, collaborate, and grow your
          influence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[5rem]">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative min-h-[372px] flex flex-col justify-end border border-transparent overflow-hidden ${item.colSpan} w-full`} // Add w-full for mobile width
            style={{
              borderImage: "linear-gradient(to right, #7A5018, #FEEA9A) 1",
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
            <div
              className={`text-left ${
                item.textLeft ? "pl-[2rem] sm:pl-[3rem]" : "pr-4 sm:pr-12"
              }  ${
                item.bottom ? "pb-[15rem] sm:pb-[2rem]" : "pb-[2rem]"
              } max-w-[380px]`} // Ensure max width on mobile
            >
              <h1 className="bg-gradient-to-r from-[#B48B34] via-[#E8C776] to-[#A67921] bg-clip-text text-transparent font-[Montserrat] font-extrabold text-[24px] uppercase">
                {item.title}
              </h1>
              <p className="text-white font-[Montserrat] font-light mt-2 text-base">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
