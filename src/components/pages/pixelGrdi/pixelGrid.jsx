import Layout from "../../layout/layout";
import Grid from "./grid";
import filledGrid from "../../../assets/icons/filledGrid.svg";
import outlinedGrid from "../../../assets/icons/outlinedGrid.svg";
import dimension from "../../../assets/icons/dimension.svg";

function PixelGrid() {
  return (
    <Layout>
      <div
        style={{ padding: "20px", margin: "8rem auto" }}
        className="max-w-7xl"
      >
        <div className="flex justify-evenly items-center">
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
        <div className="flex justify-center items-center">
          <div
            className="border border-transparent flex items-center justify-center p-6 mt-6"
            style={{
              borderImage: "linear-gradient(to right, #7A5018cc, #FEEA9Acc) 1",
            }}
          >
            <Grid />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PixelGrid;
