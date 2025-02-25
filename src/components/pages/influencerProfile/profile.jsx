import { useState } from "react";
import Layout from "../../layout/layout";
import CustomButton from "../../button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import close from "../../../assets/icons/close btn.svg";
import facebookLogo from "../../../assets/icons/FacebookLogo.svg";
import instaLogo from "../../../assets/icons/InstagramLogo.svg";
import XLogo from "../../../assets/icons/XLogo.svg";
import tiktokLogo from "../../../assets/icons/TiktokLogo.svg";
import threadsLogo from "../../../assets/icons/ThreadsLogo.svg";
import monthlyAwardIcon from "../../../assets/icons/month.svg";
import earlyAdopterIcon from "../../../assets/icons/early adopter.svg";
import tenMIcon from "../../../assets/icons/10M.svg";
import grid from "../../../assets/grid2.png";
import commas from "../../../assets/icons/commas.svg";

const socailLinks = [
  { id: 1, logo: facebookLogo, followers: "2.3M" },
  { id: 2, logo: instaLogo, followers: "2.3M" },
  { id: 3, logo: XLogo, followers: "2.3M" },
  { id: 4, logo: tiktokLogo, followers: "2.3M" },
  { id: 5, logo: threadsLogo, followers: "2.3M" },
];
const Acheivments = [
  { id: 1, logo: monthlyAwardIcon, followers: "2.3M" },
  { id: 2, logo: earlyAdopterIcon, followers: "2.3M" },
  { id: 3, logo: tenMIcon, followers: "2.3M" },
];
const InfluencerProfile = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      type === "cover" ? setCoverImage(imageUrl) : setProfileImage(imageUrl);
    }
  };

  const removeImage = (type) => {
    type === "cover" ? setCoverImage(null) : setProfileImage(null);
  };
  return (
    <Layout>
      <div className="pt-20">
        <div className="max-w-7xl w-full mx-auto relative z-10 font-[Montserrat]">
          <div
            className="bg-black mt-20 p-4 relative border border-transparent"
            style={{
              borderImage: "linear-gradient(to right, #7A5018cc, #FEEA9Acc) 1",
            }}
          >
            <div className="  overflow-hidden shadow-lg">
              {/* Cover Image Section */}
              <div className="relative w-full h-40 bg-gray-200">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <label className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600 cursor-pointer">
                    <span>Upload Cover</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "cover")}
                    />
                  </label>
                )}
                {coverImage && (
                  <button
                    onClick={() => removeImage("cover")}
                    className="absolute top-2 right-2 bg-[#0000009c] px-1 py-1 text-xs "
                  >
                    <img src={close} alt="" />
                  </button>
                )}
              </div>

              {/* Profile Image Section */}
              <div className="flex items-center justify-between">
                <div className="relative flex items-center p-4">
                  <div className="relative w-40 h-40 overflow-hidden border-4 border-black -mt-20 bg-gray-200">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <label className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600 cursor-pointer">
                        <span>+</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, "profile")}
                        />
                      </label>
                    )}
                    {profileImage && (
                      <button
                        onClick={() => removeImage("profile")}
                        className="absolute top-2 right-2 ml-4 bg-[#0000009c] px-1 py-1 text-xs "
                      >
                        <img src={close} alt="" />
                      </button>
                    )}
                  </div>

                  <div className="text-left p-3">
                    <h2 className="text-[20px] text-[#FEDB6B]  font-semibold">
                      Alex Carter
                    </h2>
                    <p className="text-[16px] font-light text-[#feea9a9c]">
                      @Alexcarter8998
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-3 text-center">
                    <p className="text-[20px] text-[#FEDB6B]  font-semibold">
                      4.3M
                    </p>
                    <p className="text-[16px] font-light text-[#feea9a9c]">
                      Clicks
                    </p>
                  </div>
                  <div className="w-[2px] h-10 bg-[#FEF6C026]"></div>
                  <div className="p-3 text-center">
                    <p className="text-[20px] text-[#FEDB6B]  font-semibold">
                      2M
                    </p>
                    <p className="text-[16px] font-light text-[#feea9a9c]">
                      Followers
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <CustomButton
                      py="py-2"
                      hidden="block"
                      name="Collaborate with me"
                      onClick={() => navigate("/sign-in")}
                      bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                      strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                    />
                    <CustomButton
                      py="py-2"
                      bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                      strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                      hidden="hidden"
                      onClick={() => navigate("/influencer-profile")}
                      name="Follow"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[16px] text-[#FEDB6B] font-[200]">
                  A creative soul blending design, tech, and a dash of humor,
                  Alex shares their journey through design tips and daily life
                  quirks. Coffee lover and weekend adventurer Socials:
                </p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#FEF6C026] mt-8 mb-8"></div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-8 gap-6 p-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="box1 md:col-span-5 ">
                <p className="text-[#766E53] uppercase font-bold">
                  Social Links
                </p>
                <div className="flex items-center flex-wrap gap-5 p-4">
                  {socailLinks.map((item, index) => (
                    <>
                      <div key={item.id} className="flex items-center gap-3">
                        <div
                          style={{
                            backgroundImage:
                              "linear-gradient(120deg, rgba(254, 246, 192, 0.14) 30%, rgba(232, 199, 118, 0.52) 150%)",

                            minHeight: "40px",
                            minWidth: "40px",
                            width: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={item.logo} alt="" />
                        </div>
                        <div>
                          <p className="text-[#FEDB6B] font-semibold text-[16px]">
                            {item.followers}
                          </p>
                          <p className="text-[#fedb6b94] font-regular text-[12px]">
                            Followers
                          </p>
                        </div>
                      </div>
                      {index !== socailLinks.length - 1 && (
                        <div className="w-[1px] h-10 bg-[#FEF6C026]"></div>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className="box2 md:col-span-3">
                <p className="text-[#766E53] uppercase font-bold">
                  Acheivments
                </p>
                <div className="flex items-center justify-between p-4">
                  {Acheivments.map((item) => (
                    <div key={item.id}>
                      <img
                        src={item.logo}
                        width={"fit-content"}
                        height={"40px"}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="box3 md:col-span-4">
                <p className="text-[#766E53] uppercase font-bold">Promo REEL</p>
                <div
                  className="mt-4 h-fit md:h-[347px]"
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(120deg,rgb(254, 246, 192,  0.15) 0%, rgb(232, 199, 118, 0.51)300%)",

                    border: "1px solid #feea9a38",
                  }}
                ></div>
              </div>
              <div className="box4 md:col-span-4">
                <p className="text-[#766E53] uppercase font-bold">
                  Pixel Grid View
                </p>
                <div
                  className="relative h-fit md:h-[347px] p-4 border border-transparent mt-4 flex items-center justify-center"
                  style={{
                    borderImage:
                      "linear-gradient(to right, rgb(255,248,197,52%) ,  rgb(140,94,28,21%)) 1",
                    width: "100%",
                  }}
                >
                  <img src={grid} alt="" />
                </div>
              </div>
            </motion.div>

            <div className="w-full h-[1px] bg-[#FEF6C026] mt-8 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6 p-4">
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <p className="text-[#766E53] uppercase font-bold text-[16px]">
                  Recent PROJECTS
                </p>
                <div className="mt-4">
                  <p className="text-[#FEDB6B]  font-semibold text-[16px]">
                    PixelEmpire
                  </p>
                  <p className="text-[#FEEA9A]  font-light text-[12px]">
                    Brand Name
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="md:col-span-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <p className="text-[#766E53] text-[16px] uppercase font-bold">
                  Detials
                </p>
                <div className="mt-4">
                  <p className="text-[16px] text-[#FEDB6B] font-extralight">
                    PixelEmpire is a revolutionary digital real estate
                    marketplace where users can purchase, own, and customize
                    pixels on a massive 100x100 grid. Each pixel costs $1 and
                    can be personalized with colors, images, or brand logos.
                    Whether for advertising, personal expression, or just fun,
                    PixelEmpire lets you leave your mark on the digital world!
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-[#766E53] text-[16px] uppercase font-bold">
                    Testimonial
                  </p>
                  <div className="mt-4 ">
                    <div className="mb-2 flex justify-start items-center">
                      <img src={commas} alt="" />
                    </div>
                    <p className="text-[16px] text-[#FEDB6B] font-extralight ">
                      The Pixel Grid Marketplace is a genius concept! The buying
                      process was smooth, and customizing my pixels was super
                      easy. I love how I can showcase my brand creatively.
                      Definitely a fun and unique investment!
                    </p>
                    <div className="mt-2 flex justify-end items-center">
                      <img src={commas} alt="" className=" scale-x-[-1]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InfluencerProfile;
