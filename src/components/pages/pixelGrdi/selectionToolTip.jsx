import { motion } from "framer-motion";
import coinsIcon from "../../../assets/icons/Coins.svg";
import CustomButton from "../../button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SelectionToolTip = ({
  tooltipPos,
  hoveredSelection,
  selectionSummary,
  handleSelectPixels,
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("selectionSummary", selectionSummary, isAuthenticated);

  const navigate = useNavigate();
  return (
    <motion.div
      className="absolute text-black text-sm px-3 py-2 shadow-lg font-[Montserrat] "
      style={{
        top: tooltipPos.y + 10,
        left: tooltipPos.x + 10,
        background: "#000000a6",
        backdropFilter: "blur(39px)",
        border: "1px solid",
        borderImage: "linear-gradient(to right, #FFF8C5, #8C5E1C) 1",
        padding: "1rem",
        width: "215px",
        height: "fit-content",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "0px",
          width: "0",
          height: "0",
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: "10px solid #FEDB6B", // Adjust color
          transform: "rotate(-45deg)",
        }}
      ></div>
      <div className="">
        <div className="flex items-center justify-between">
          <p className="font-[Inter] text-[12px] font-medium text-[#FFE395]">
            Total Block
          </p>
          <p className="font-[Montserrat] text-[14px] font-semibold text-white">
            {!selectionSummary?.totalBlocks ? 0 : selectionSummary?.totalBlocks}
          </p>
        </div>
        <div className="w-full h-[1px] bg-[#FEF6C026] mt-1 mb-1"></div>
        <div className="flex items-center justify-between">
          <p className="font-[Inter] text-[12px] font-medium text-[#FFE395]">
            Pixels
          </p>
          <p className="font-[Montserrat] text-[14px] font-semibold text-white">
            {!selectionSummary?.pixelsInRow ? 0 : selectionSummary?.pixelsInRow}{" "}
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
      <div className="w-full h-[1px] bg-[#FEF6C026] mt-1 mb-1"></div>
      <div className="w-full mt-6">
        <CustomButton
          py="py-2"
          hidden="block"
          name={isAuthenticated ? "Select" : "Get Started"}
          width="w-full"
          onClick={() => {
            isAuthenticated ? handleSelectPixels() : navigate("/sign-in");
          }}
          bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
          strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
        />
      </div>
    </motion.div>
  );
};

export default SelectionToolTip;
