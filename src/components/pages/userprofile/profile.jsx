import React, { useEffect, useRef, useState } from "react";
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
import { RiMore2Fill, RiUploadCloudFill } from "react-icons/ri";
import UserCircleGear from "../../../assets/icons/UserCircleGear.svg";

import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  ThemeProvider,
} from "@material-tailwind/react";

import closeBtn from "../../../assets/icons/close btn.svg";
import AuctionDrawer from "./drawer";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/slice/userSlice";
import { IMAGE_BASEURL } from "../../../redux/services/http-comman";
import CountUp from "react-countup";
import Grid from "../pixelGrdi/grid";
import profileServices from "../../../redux/services/profileServices";
import { toast } from "react-toastify";
import { logout } from "../../../redux/slice/authSlice";

const Acheivments = [
  { id: 1, logo: monthlyAwardIcon, followers: "2.3M" },
  { id: 2, logo: earlyAdopterIcon, followers: "2.3M" },
  { id: 3, logo: tenMIcon, followers: "2.3M" },
];

const customTheme = {
  dialog: {
    styles: {
      base: {
        backdrop: {
          backgroundColor: "#00000024",
        },
      },
    },
  },
  radio: {
    valid: {
      colors: ["yellow"],
    },
    styles: {
      colors: {
        yellow: {
          color: "#FEDB6B",
          border: "checked:border-[#FEDB6B]",
          before: "checked:before:bg-[#FEDB6B]",
        },
      },
    },
  },
};
const UserProfile = () => {
  const dispatch = useDispatch();
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [pixelImage, setPixelImage] = useState(null);
  const [isOpenMenu, setOpenMenu] = useState(null);
  const [isOpenDelete, setOpenDelete] = useState(null);
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const openMenuRef = useRef();
  const profileData = useSelector((s) => s?.user?.data?.data);
  // console.log("profileData", profileData);
  const [promoVideo, setPromoVideo] = useState(null);

  const isLoggedIn = localStorage.getItem("token");
  const socailLinks = [
    {
      id: 1,
      logo: facebookLogo,
      followers: "2.3M",
      username: profileData?.facebook,
    },
    {
      id: 2,
      logo: instaLogo,
      followers: "2.3M",
      username: profileData?.instagram,
    },
    {
      id: 3,
      logo: XLogo,
      followers: "2.3M",
      username: profileData?.twitter,
    },
    // { id: 4, logo: tiktokLogo, followers: "2.3M" },
    // { id: 5, logo: threadsLogo, followers: "2.3M" },
  ];

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setPromoVideo(videoURL);
      handleUploadReel(file);
    }
  };
  const handleUploadReel = async (file) => {
    console.log(file);

    const datas = {
      file: file,
    };
    try {
      const res = await profileServices.uploadPromo(datas);
      console.log(res);
      if (res) {
        toast.success(res?.data?.message);
        await dispatch(getUserProfile());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      await dispatch(getUserProfile());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuRef.current && !openMenuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result);
      };
      setPixelImage(file);
      reader.readAsDataURL(file);
      handleUploadImage(file);
    }
  };
  // console.log("setPixelImage");

  const handleUploadImage = async (file) => {
    if (!file) {
      toast.error("Please upload image ");
      return;
    }
    const datas = { file: file };

    try {
      const res = await profileServices.uploadCover(datas);
      if (res) {
        // console.log(res);
        await dispatch(getUserProfile());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const removeImage = (type) => {
    type === "cover" ? setCoverImage(null) : setProfileImage(null);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await profileServices.deleteUser();
      console.log("res", res);
      if (res) {
        toast.success("Profile Deleted Successfully");
        dispatch(logout());
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div className="max-w-7xl w-full mx-auto  relative z-10 font-[Montserrat] pt-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="text-[16px] font-bold lg:text-[24px] leading-[1.2] lg:leading-[20px] uppercase"
            style={{
              backgroundImage:
                "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Home
          </h1>
          <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light flex items-center gap-4 ">
            <a href="/">Home</a> <FaChevronRight />{" "}
            <a href="#" className="text-[#FFF8C5] font-semibold">
              My Profile
            </a>{" "}
          </p>
        </motion.div>
        <div
          className="bg-black p-4 relative border border-transparent mt-4"
          style={{
            borderImage: "linear-gradient(to right, #7A5018cc, #FEEA9Acc) 1",
          }}
        >
          <div className="shadow-lg">
            {/* Cover Image Section */}
            <div className="relative w-full h-40 bg-gray-200">
              {profileData?.cover ? (
                <img
                  src={IMAGE_BASEURL + profileData?.cover}
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
                    onChange={(e) => handleImageUpload(e)}
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
                  {profileImage || profileData?.profilePicture ? (
                    <img
                      src={
                        profileData.profilePicture
                          ? IMAGE_BASEURL + profileData?.profilePicture
                          : profileImage
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <label className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-600 cursor-pointer">
                      <span>+</span>
                      <input
                        // type="file"
                        accept="image/*"
                        className="hidden"
                        // onChange={(e) => handleImageUpload(e, "profile")}
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
                    {profileData?.firstName || ""} {profileData?.lastName || ""}
                  </h2>
                  {/* <p className="text-[16px] font-light text-[#feea9a9c]">
                    {profileData?.userName || ""}
                  </p> */}
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-3 text-center">
                  <p className="text-[20px] text-[#FEDB6B]  font-semibold">
                    <CountUp end={2} decimals={0} suffix="" duration={2} />
                  </p>
                  <p className="text-[16px] font-light text-[#feea9a9c]">
                    Clicks
                  </p>
                </div>
                <div className="w-[2px] h-10 bg-[#FEF6C026]"></div>
                <div className="p-3 text-center">
                  <p className="text-[20px] text-[#FEDB6B]  font-semibold">
                    <CountUp end={0} decimals={0} suffix="" duration={2} />
                  </p>
                  <p className="text-[16px] font-light text-[#feea9a9c]">
                    Followers
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4 relative">
                  <CustomButton
                    py="py-2"
                    hidden="block"
                    name="Edit Profile"
                    onClick={() => navigate("/edit-profile")}
                    bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                    strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                  />
                  <CustomButton
                    py="py-2"
                    bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                    strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                    hidden="hidden"
                    onClick={() => setOpenDrawer(true)}
                    name="Auction My Pixel"
                  />
                  <IconButton
                    onClick={() => setOpenMenu(true)}
                    className="bg-black w-[8px] text-[24px]"
                  >
                    <RiMore2Fill />
                  </IconButton>
                  {isOpenMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      ref={openMenuRef}
                      className="absolute right-0 top-[40px] mt-2 p-[16px] bg-black shadow-lg overflow-hidden z-50 border"
                      style={{
                        borderImage:
                          "linear-gradient(to right, #ffe39554, #ffe39554) 1",
                      }}
                    >
                      <div className="flex flex-col gap-4 items-center">
                        <Button
                          onClick={() => setOpenDelete(!isOpenDelete)}
                          className="text-[#FFE395] font-light font-[Inter] text-[16px] bg-transparent "
                        >
                          Delete Profile
                        </Button>
                        <Button className="text-[#FFE395] font-light font-[Inter] text-[16px] bg-transparent">
                          Share Link
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[16px] text-[#FEDB6B] font-[200]">
                {profileData?.bio || ""}
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
              <p className="text-[#766E53] uppercase font-bold">Social Links</p>
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
                          @{item.username ?? "n/a"}
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
            {!isLoggedIn && (
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
            )}
            <div className="box3 md:col-span-4">
              <p className="text-[#766E53] uppercase font-bold">Promo REEL</p>
              <div
                className="mt-4 h-fit md:h-[347px] flex items-center justify-center relative"
                style={{
                  width: "100%",
                  background:
                    "linear-gradient(120deg,rgb(254, 246, 192,  0.15) 0%, rgb(232, 199, 118, 0.51)300%)",
                  border: "1px solid #feea9a38",
                }}
              >
                {promoVideo || profileData?.promo ? (
                  <div className="relative w-full h-full">
                    <video
                      src={promoVideo || `${IMAGE_BASEURL}${profileData.promo}`}
                      controls
                      className="w-full h-full object-cover"
                    ></video>
                    <button
                      onClick={() => {
                        setPromoVideo(null);
                      }}
                      className="absolute top-2 right-2 ml-4 bg-[#0000009c] px-1 py-1 text-xs "
                    >
                      <img src={close} alt="" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <p className="text-[#FEDB6B] font-semibold flex flex-col items-center">
                      <RiUploadCloudFill
                        style={{ color: "#FEDB6B", fontSize: "20px" }}
                      />
                      Upload Promo Reel
                    </p>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleVideoUpload(e)}
                    />
                  </label>
                )}
              </div>
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
                  overflow: "hidden",
                }}
              >
                <Grid />
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
                  {profileData?.projects[0]?.brandName || ""}
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
                  {profileData?.projects[0]?.details || ""}
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
                    {profileData?.projects[0]?.testimonial || ""}
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

      <ThemeProvider value={customTheme}>
        <Dialog
          open={isOpenDelete}
          handler={() => setOpenDelete(false)}
          style={{
            background: "#000",
            borderRadius: "0px",
            padding: "24px",
            borderImage: "linear-gradient(to right, #ffd3633b, #fff8c570)1",
            border: "1px solid #ffd3633b",
          }}
          size="sm"
        >
          <DialogHeader>
            <div className="flex justify-end items-start w-full">
              <IconButton onClick={() => setOpenDelete(false)}>
                <img src={closeBtn} alt="close-btn" />
              </IconButton>
            </div>
          </DialogHeader>
          <DialogBody>
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center">
                <div
                  style={{
                    background:
                      "linear-gradient(150deg, #fef6c026 40%,#e8c77682)",
                    width: "138px",
                    height: "138px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderImage:
                      "linear-gradient(to right, #ffd3633b, #fff8c570)1",
                    border: "1px solid",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(150deg, #fef6c026 100%,#e8c77682)",
                      width: "106px",
                      height: "106px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={UserCircleGear} alt="" />
                  </div>
                </div>
                <div className="mt-[40px]">
                  <div>
                    <motion.h1
                      className="text-[16px] lg:text-[24px]  uppercase"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "Montserrat",
                        fontWeight: "800",
                      }}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      Delete Profile
                    </motion.h1>
                    <p className="text-white font-light text-[16px]">
                      Do you really want to delete your profile. this can be
                      undone when click yes.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mt-[40px]">
                    <CustomButton
                      bgGradient="linear-gradient(to right, #D9D9D9 0%, #ffffff 50%, #D9D9D9 100%)"
                      strokeGradient="linear-gradient(to right, #FFFFFF 0%, #B7B7B7 100%)"
                      py="py-2"
                      hidden="hidden"
                      onClick={() => navigate("/pixel-grid")}
                      name="Cancel"
                      px="px-6"
                      width="w-full"
                    />
                    <CustomButton
                      py="py-2"
                      hidden="block"
                      name="Yes, delete my profile"
                      width="w-full"
                      px="px-6"
                      isLoading={isLoading}
                      onClick={handleDelete}
                      bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                      strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </ThemeProvider>
      <AuctionDrawer open={isOpenDrawer} closeDrawer={setOpenDrawer} />
    </Layout>
  );
};

export default UserProfile;
