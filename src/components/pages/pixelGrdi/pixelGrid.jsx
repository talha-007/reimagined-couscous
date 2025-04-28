import Layout from "../../layout/layout";
import Grid from "./grid";
import filledGrid from "../../../assets/icons/filledGrid.svg";
import outlinedGrid from "../../../assets/icons/outlinedGrid.svg";
import dimension from "../../../assets/icons/dimension.svg";

function PixelGrid() {
  return (
    <Layout>
      <div
        className="absolute bottom-[75%] left-[-30%] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div
        className="absolute bottom-[30%] left-[-250px] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[350px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div
        className="absolute bottom-[50%] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
      <div
        className="absolute bottom-[550px] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10"
        style={{
          boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
        }}
      ></div>
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
            <Grid selection={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PixelGrid;
