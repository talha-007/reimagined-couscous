import { motion } from "framer-motion"; // Import framer-motion
import Grid from "../pixelGrdi/grid";

import filledGrid from "../../../assets/icons/filledGrid.svg";
import outlinedGrid from "../../../assets/icons/outlinedGrid.svg";
import dimension from "../../../assets/icons/dimension.svg";

const SelectPixels = () => {
  return (
    <div className="max-w-5xl w-full mx-auto  font-[Montserrat]">
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
          Select pixels
        </h1>
        <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
          Choose the pixels you want to buy—simply drag to select.
        </p>
        <div className="flex justify-center items-center">
          <div
            className="border border-transparent flex flex-col  p-4 mt-6"
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
            <Grid />
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default SelectPixels;
