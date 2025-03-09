import { motion } from "framer-motion"; // Import framer-motion
import imageIcon from "../../../assets/icons/ImageSquare.svg";
import { useState } from "react";
import close from "../../../assets/icons/close btn.svg";
import Layout from "../../layout/layout";
import { FaChevronRight } from "react-icons/fa";
import CustomButton from "../../button";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const naviagte = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    naviagte("/profile");
  };
  return (
    <Layout>
      <div className="max-w-7xl w-full py-30 mx-auto relative z-10 font-[Montserrat]">
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
            <a href="/profile">My Profile</a> <FaChevronRight />{" "}
            <a href="#" className="text-[#FFF8C5] font-semibold">
              Edit Profile
            </a>
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="w-full">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                First Name<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <input
                type="text"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter First Name"
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Last Name<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <input
                type="text"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Email<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <input
                type="email"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>
          <div className="w-full col-span-3">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Bio<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <textarea
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase resize-none"
                placeholder="Enter Bio"
                required
                rows={4} // Adjust the number of rows as needed
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-2 font-[Inter] text-[14px] uppercase">
                Upload your profile picture
                <span style={{ color: "#FFE395" }}>*</span>
              </label>

              <div className="w-[190px] h-[190px] border-2 border-[#766E53cc] flex items-center justify-center relative bg-[#FFD363] relative">
                {/* File Input */}
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {/* Conditional Rendering */}
                {profileImage ? (
                  // Show Uploaded Image
                  <label
                    htmlFor="profile-upload"
                    className="w-full h-full cursor-pointer"
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </label>
                ) : (
                  // Show Upload Box
                  <label
                    htmlFor="profile-upload"
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-white text-sm font-[Inter]"
                  >
                    <span className="text-[#000] flex items-center justify-center flex-col text-center">
                      <img src={imageIcon} alt="Upload Icon" />
                      Upload Profile <br /> Picture
                    </span>
                  </label>
                )}
                {profileImage && (
                  <button
                    onClick={() => setProfileImage(null)}
                    className="absolute top-2 right-2 ml-4 bg-[#0000009c] px-1 py-1 text-xs "
                  >
                    <img src={close} alt="" />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* social links */}
          <div className="w-full col-span-3">
            <div>
              <p className="text-white font-[Inter] text-[16px] font-semibold uppercase">
                Social links
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Facebook Link<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <input
                type="text"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter Facebook link"
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Instagram Link<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <input
                type="text"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter Instagram Link"
                required
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Twitter Link<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <input
                type="text"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter Twitter Link"
                required
              />
            </div>
          </div>
          <div className="w-full col-span-3 h-[1px] bg-[#FEF6C026] mt-4 mb-4"></div>
          {/* projects */}
          <div className="w-full col-span-3">
            <div>
              <p className="text-white font-[Inter] text-[16px] font-semibold uppercase">
                Projects
              </p>
            </div>
          </div>
          <div className="w-full col-span-3">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Brand Name<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <input
                type="text"
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
                placeholder="Enter Brand name"
                required
              />
            </div>
          </div>
          <div className="w-full col-span-3">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Details<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <textarea
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase resize-none"
                placeholder="Enter Details"
                required
                rows={4} // Adjust the number of rows as needed
              />
            </div>
          </div>
          <div className="w-full col-span-3">
            <div className="flex flex-col mb-2">
              <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
                Testimonial<span style={{ color: "#FFE395" }}>*</span>
              </label>
              <textarea
                className="px-4 py-3 border border-[#766E53cc] bg-transparent text-white font-[Inter] placeholder:text-[#484848] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase resize-none"
                placeholder="Enter Testimonial"
                required
                rows={4} // Adjust the number of rows as needed
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-8">
          <CustomButton
            py="py-4"
            hidden="block"
            name={"Save & Update"}
            onClick={handleSave}
            width="w-[200px] md:w-[400px]"
            bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
            strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
