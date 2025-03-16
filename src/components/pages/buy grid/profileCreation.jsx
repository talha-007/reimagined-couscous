import { motion } from "framer-motion"; // Import framer-motion
import imageIcon from "../../../assets/icons/ImageSquare.svg";
import { useState } from "react";
import close from "../../../assets/icons/close btn.svg";
import influencerProfileServices from "../../../redux/services/influencerProfileServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../button";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  bio: "",
  profilePicture: "",
  facebook_link: "",
  instagram_link: "",
  twitter_link: "",
  brand_name: "",
  details: "",
  testimonial: "",
};

const ProfileCreation = ({ handleNext, updateFormData }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!value) {
        // Remove error if the field is empty
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    }
  };

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

  const validateProfileForm = (values) => {
    let errors = {};

    if (!values.first_name) errors.first_name = "First name is required";
    if (!values.last_name) errors.last_name = "Last name is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.bio) errors.bio = "Bio is required";
    if (!values.facebook_link)
      errors.facebook_link = "Facebook link is required";
    if (!values.instagram_link)
      errors.instagram_link = "Instagram link is required";
    if (!values.twitter_link) errors.twitter_link = "Twitter link is required";
    if (!values.brand_name) errors.brand_name = "Brand name is required";
    if (!values.details) errors.details = "Details are required";
    if (!values.testimonial) errors.testimonial = "Testimonial is required";
    if (!profileImage) errors.profileImage = "Profile Image is required";

    return errors;
  };

  const handleProfileCreation = () => {
    const newErrors = validateProfileForm(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const datas = {
        ...values,
        profilePicture: profileImage,
      };
      updateFormData("profile", datas);
      handleNext();
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto relative z-10 font-[Montserrat]">
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
          Profile Creation
        </h1>
        <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
          To purchase pixels, you must first set up your influencer profile.
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
              name="first_name"
              autoComplete="off"
              value={values.first_name}
              onChange={handleOnChange}
            />
            {errors.first_name && (
              <p className="text-red-500 text-[10px]">{errors.first_name}</p>
            )}
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
              name="last_name"
              autoComplete="off"
              value={values.last_name}
              onChange={handleOnChange}
            />
            {errors.last_name && (
              <p className="text-red-500 text-[10px]">{errors.last_name}</p>
            )}
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
              name="email"
              autoComplete="off"
              value={values.email}
              onChange={handleOnChange}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px]">{errors.email}</p>
            )}
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
              rows={4}
              name="bio"
              autoComplete="off"
              value={values.bio}
              onChange={handleOnChange}
            />
            {errors.bio && (
              <p className="text-red-500 text-[10px]">{errors.bio}</p>
            )}
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
                name="profileImage"
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
            {errors.profileImage && (
              <p className="text-red-500 text-[10px]">{errors.profileImage}</p>
            )}
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
              name="facebook_link"
              autoComplete="off"
              value={values.facebook_link}
              onChange={handleOnChange}
            />
            {errors.facebook_link && (
              <p className="text-red-500 text-[10px]">{errors.facebook_link}</p>
            )}
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
              name="instagram_link"
              autoComplete="off"
              value={values.instagram_link}
              onChange={handleOnChange}
            />
            {errors.instagram_link && (
              <p className="text-red-500 text-[10px]">
                {errors.instagram_link}
              </p>
            )}
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
              name="twitter_link"
              autoComplete="off"
              value={values.twitter_link}
              onChange={handleOnChange}
            />
            {errors.twitter_link && (
              <p className="text-red-500 text-[10px]">{errors.twitter_link}</p>
            )}
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
              name="brand_name"
              autoComplete="off"
              value={values.brand_name}
              onChange={handleOnChange}
            />
            {errors.brand_name && (
              <p className="text-red-500 text-[10px]">{errors.brand_name}</p>
            )}
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
              rows={4}
              name="details"
              autoComplete="off"
              value={values.details}
              onChange={handleOnChange}
            />
            {errors.details && (
              <p className="text-red-500 text-[10px]">{errors.details}</p>
            )}
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
              rows={4}
              name="testimonial"
              autoComplete="off"
              value={values.testimonial}
              onChange={handleOnChange}
            />
            {errors.testimonial && (
              <p className="text-red-500 text-[10px]">{errors.testimonial}</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 max-w-5xl w-full justify-center mx-auto my-8 col-span-3">
          <CustomButton
            py="py-4"
            hidden="block"
            name={"Next"}
            onClick={handleProfileCreation}
            width="w-[200px] md:w-[400px]"
            bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
            strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;
