import { motion } from "framer-motion"; // Import framer-motion
import { useEffect, useState } from "react";
import coinsIcon from "../../../assets/icons/Coins.svg";

import imageIcon from "../../../assets/icons/ImageSquare.svg";
import Grid from "../pixelGrdi/grid";
import filledGrid from "../../../assets/icons/filledGrid.svg";
import outlinedGrid from "../../../assets/icons/outlinedGrid.svg";
import dimension from "../../../assets/icons/dimension.svg";
import influencerProfileServices from "../../../redux/services/influencerProfileServices";
import CustomButton from "../../button";
import close from "../../../assets/icons/close btn.svg";
import { toast } from "react-toastify";

const PixelInformation = ({ handleNext, updateFormData }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [pixelImage, setPixelImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [selectionSummary, setSelectionSummary] = useState("");

  useEffect(() => {
    const summary = JSON.parse(localStorage.getItem("selectionSummary"));
    // console.log("summary", summary);
    setSelectionSummary(summary);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      setPixelImage(file);
      reader.readAsDataURL(file);
    }
  };
  // console.log(selectionSummary);

  const handleUploadImage = async () => {
    if (!profileImage) {
      toast.error("Please upload pixel image ");
      return;
    }
    const datas = { file: pixelImage };

    setIsLoading(true);
    try {
      const res = await influencerProfileServices.uploadPixelImage(datas);
      if (res) {
        // console.log(res);
        updateFormData("pixelInfo", profileImage);
        handleNext();
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Image upload failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto  font-[Montserrat]">
      {" "}
      <div>
        <h1
          className="text-[16px] font-bold lg:text-[24px] leading-[1.2] lg:leading-[20px] uppercase"
          style={{
            backgroundImage:
              "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          pixel information
        </h1>
        <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
          Add the necessary pixel information
        </p>
      </div>
      <div className="bg-[#3535353b] border-[1px] border-[#feea9a17] px-4 py-2 my-4">
        <div className="">
          <div className="flex items-center justify-between">
            <p className="font-[Inter] text-[12px] font-medium text-[#FFE395]">
              Total Block
            </p>
            <p className="font-[Montserrat] text-[14px] font-semibold text-white">
              {!selectionSummary?.totalBlocks
                ? 0
                : selectionSummary?.totalBlocks}
            </p>
          </div>
          <div className="w-full h-[1px] bg-[#FEF6C026] mt-1 mb-1"></div>
          <div className="flex items-center justify-between">
            <p className="font-[Inter] text-[12px] font-medium text-[#FFE395]">
              Pixels
            </p>
            <p className="font-[Montserrat] text-[14px] font-semibold text-white">
              {!selectionSummary?.pixelsInRow
                ? 0
                : selectionSummary?.pixelsInRow}{" "}
              x{" "}
              {!selectionSummary?.pixelsInColumn
                ? 0
                : selectionSummary?.pixelsInColumn}
            </p>
          </div>
          <div className="w-full h-[1px] bg-[#FEF6C026] mt-1 mb-1"></div>
          <div className="flex items-center justify-between">
            <p className="font-[Inter] text-[12px] font-medium text-[#FFE395]">
              Subtotal
            </p>
            <div className="flex items-center gap-1.5">
              <img src={coinsIcon} alt="" />
              <p className="font-[Montserrat] text-[14px] font-semibold text-white">
                {!selectionSummary?.subtotal ? 0 : selectionSummary?.subtotal}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label className="text-white font-medium mb-2 font-[Inter] text-[14px] uppercase">
            upload image for pixels
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
                  Upload Image
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
          <p className="text-[#FFF8C5] text-[16px] font-[Montserrat] mt-2">
            Resolution{" "}
            {!selectionSummary?.pixelsInRow ? 0 : selectionSummary?.pixelsInRow}
            px width &{" "}
            {!selectionSummary?.pixelsInColumn
              ? 0
              : selectionSummary?.pixelsInColumn}
            px Height
          </p>
        </div>
      </div>
      <div className="mt-4">
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
          preview
        </motion.h1>
        <div className="flex justify-center items-center">
          <div
            className="border border-transparent flex flex-col  p-4 mt-4"
            style={{
              borderImage: "linear-gradient(to right, #7A5018cc, #FEEA9Acc) 1",
            }}
          >
            <div className="flex justify-evenly items-center mb-4">
              <div className="flex items-center gap-2">
                <img src={filledGrid} alt="" />
                <p className="text-[#FFF8C5] text-[10px] md:text-[16px]">
                  Total Pixel sold:{" "}
                  <span className="font-[500] text-[#FEDF7A]">5,000</span>
                </p>
              </div>
              <div className="w-[2px] h-8 bg-[#FEF6C026]"></div>
              <div className="flex items-center gap-2">
                <img src={outlinedGrid} alt="" />
                <p className="text-[#FFF8C5] text-[10px] md:text-[16px]">
                  Remaining Pixels:{" "}
                  <span className="font-[500] text-[#FEDF7A]">5,000</span>
                </p>
              </div>
              <div className="w-[2px] h-8 bg-[#FEF6C026]"></div>
              <div className="flex items-center gap-2">
                <img src={dimension} alt="" />
                <p className="text-[#FFF8C5] text-[10px] md:text-[16px]">
                  Per Pixel Dimension:{" "}
                  <span className="font-[500] text-[#FEDF7A]">10x10</span>
                </p>
              </div>
            </div>
            <Grid Summary={selectionSummary} image={profileImage} />
          </div>
        </div>
      </div>
      <div className="flex gap-4 max-w-5xl w-full justify-center mx-auto my-8 ">
        <CustomButton
          py="py-4"
          hidden="block"
          isLoading={isLoading}
          name={"Next"}
          onClick={handleUploadImage}
          width="w-[200px] md:w-[400px]"
          bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
          strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
        />
      </div>
    </div>
  );
};

export default PixelInformation;
