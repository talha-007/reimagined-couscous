import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";
import GlowingCircle from "./glowingCircle";

const HowItWorks = () => {
  const items = [
    { id: 1, icon: icon1, title: "Claim your pixel" },
    { id: 2, icon: icon2, title: "Share your vision" },
    { id: 3, icon: icon3, title: "Amplify your impact" },
    { id: 4, icon: icon4, title: "Join the community" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-transparent lg:my-[10rem] md:my-[8rem] sm:my-[4rem] my-[2rem]">
      <div className="text-center sm:px-[12rem]">
        <h1 className="bg-gradient-to-r from-[#B48B34] via-[#E8C776] to-[#A67921] bg-clip-text text-transparent  font-[Montserrat] font-extrabold lg:text-[36px] sm:text-[24px] text-[24px] uppercase">
          How it works
        </h1>
        <p className="text-white  font-[Montserrat] mt-2 lg:text-[24px] sm:text-[20px] text-[16px]">
          upload your DP or logo and link your account. Then, sit back and enjoy
          your growth!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:mt-[4rem] mt-[2rem]">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative border border-transparent flex flex-col items-center justify-center h-[242px] overflow-hidden"
            style={{
              borderImage: "linear-gradient(to right, #7A5018, #FEEA9A) 1",
            }}
          >
            <div className="bg-gradient-to-b from-[rgba(254,246,192,0.15)] to-[rgba(232,200,118,0.53)] p-2 text-center h-[48px] w-[48px] absolute top-0 left-0 font-[Montserrat] text-[#FEEA9A] font-bold flex justify-center items-center">
              <p>{item.id}</p>
            </div>
            <div className="flex justify-center items-center bg-gradient-to-b from-[rgba(254,246,192,0.15)] to-[rgba(232,200,118,0.53)] rounded-md w-16 h-16">
              <img src={item.icon} alt={item.title} className="w-8 h-8" />
            </div>
            <h1 className="text-[24px] font-bold text-transparent bg-gradient-to-r from-[#B48B34] via-[#E8C776] to-[#A67921] bg-clip-text uppercase mt-2 text-center max-w-[200px]">
              {item.title}
            </h1>
            <div
              className="absolute bottom-[-100px]  w-[150px] h-[150px] rounded-full bg-[#B48B34] blur-[100px] opacity-50"
              style={{
                boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
// background: linear-gradient(151.46deg, rgba(254, 246, 192, 0.0615) 17.62%, rgba(232, 199, 118, 0.2132) 125.69%);
