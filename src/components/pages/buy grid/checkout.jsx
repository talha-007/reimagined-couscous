import React, { useEffect, useState } from "react";

import coinsIcon from "../../../assets/icons/Coins.svg";
const Checkout = () => {
  const [selectionSummary, setSelectionSummary] = useState("");
  useEffect(() => {
    const summary = localStorage.getItem("selectionSummary");
    console.log("summary", summary);
    setSelectionSummary(JSON.parse(summary));
  }, []);
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
                {!selectionSummary.subtotal ? 0 : selectionSummary.subtotal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
