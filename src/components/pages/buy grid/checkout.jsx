import React, { useEffect, useState } from "react";

import coinsIcon from "../../../assets/icons/Coins.svg";
import CustomButton from "../../button";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../redux/slice/userSlice";
import { toast } from "react-toastify";
import BuyCredits from "./buyCredits";
import PayModel from "./payModel";
import Popup from "./popup";
import influencerProfileServices from "../../../redux/services/influencerProfileServices";

const Checkout = ({ handleNext }) => {
  const dispatch = useDispatch();
  const [selectionSummary, setSelectionSummary] = useState("");
  const [openCoinsPopup, setOpenCoinsPopup] = useState(false);
  const [OpenPayModel, setOpenPayModel] = useState(false);
  const [showSccessPopup, setShowSccessPopup] = useState(false);
  useEffect(() => {
    const summary = JSON.parse(localStorage.getItem("selectionSummary"));
    // console.log("summary", summary);
    setSelectionSummary(summary);
  }, []);
  const profileData = useSelector((s) => s?.user?.data?.data);
  // console.log("profileData", profileData);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleOpenPay = () => {
    setOpenPayModel(true);
  };
  const handleShowSuccessPop = () => {
    setShowSccessPopup(true);
    setOpenPayModel(false);
  };

  const fetchProfileData = async () => {
    try {
      await dispatch(getUserProfile());
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckout = async () => {
    if (Number(profileData?.coins || 0) < Number(selectionSummary?.subtotal)) {
      setOpenCoinsPopup(true);
    }
    const datas = {
      subtotal: selectionSummary.subtotal,
      email: profileData?.email,
      selectedPixels: selectionSummary?.selectedCoordinates,
    };
    try {
      const res = await influencerProfileServices.SelectPixel(datas);
      // console.log(">>>>>>>>>>>>>>>>>>>>>>", res);
      if (res.data.success) {
        handleNext();
        dispatch(getUserProfile());
      }
    } catch (error) {
      console.log("error", error);
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
      <div className="flex gap-4 max-w-5xl w-full justify-center mx-auto my-8 ">
        <CustomButton
          py="py-4"
          hidden="block"
          name={"Pay Now"}
          onClick={handleCheckout}
          width="w-[200px] md:w-[400px]"
          bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
          strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
        />
      </div>
      <BuyCredits
        open={openCoinsPopup}
        handleClose={() => setOpenCoinsPopup(false)}
        handleOpenPay={handleOpenPay}
      />
      <PayModel
        open={OpenPayModel}
        handleClose={() => setOpenPayModel(false)}
        handleShowSuccessPop={handleShowSuccessPop}
        profileData={profileData}
      />
      <Popup
        open={showSccessPopup}
        close={() => setShowSccessPopup(false)}
        head={" Credits purchased succesfully"}
        text={"Credits are added in your credits vault"}
        btnText="Countinue"
        handlenext={() => {}}
      />
    </div>
  );
};

export default Checkout;
