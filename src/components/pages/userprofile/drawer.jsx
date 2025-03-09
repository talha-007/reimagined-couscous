import {
  Button,
  Checkbox,
  Drawer,
  IconButton,
  ThemeProvider,
  Typography,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import CustomButton from "../../button";
import { useState } from "react";
import TimerInput from "../../shared/timerInput/Timer";
import successIcon from "../../../assets/icons/world.svg";

const theme = {
  drawer: {
    defaultProps: {
      size: 394,
      overlay: true,

      overlayProps: undefined,
      className: "",
      dismiss: undefined,
      onClose: undefined,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    styles: {
      base: {
        drawer: {
          position: "fixed",
          zIndex: "z-[9999]",
          pointerEvents: "pointer-events-auto",
          backgroundColor: "bg-black",
          boxSizing: "box-border",
          //   width: "100%",

          boxShadow: "shadow-2xl shadow-blue-gray-900/10",
        },
        overlay: {
          position: "absolute",
          inset: "inset-0",
          width: "w-full",
          height: "h-full",
          pointerEvents: "pointer-events-auto",
          zIndex: "z-[9995]",
          backgroundColor: "#00000024",
          backgroundOpacity: "bg-opacity-30",
          backdropBlur: "backdrop-blur-sm",
        },
      },
    },
  },
};
const AuctionDrawer = ({ closeDrawer, open }) => {
  const [selectedMethod, setSelectedMethod] = useState("auction");
  const [isSold, setIsSold] = useState(false);

  const handleSell = () => {
    setIsSold(true);
  };
  const handleCheckboxChange = (method) => {
    setSelectedMethod(method);
  };

  return (
    <div>
      <ThemeProvider value={theme}>
        <Drawer
          open={open}
          placement="right"
          size={395}
          onClose={() => {
            closeDrawer(false);
            setIsSold(false); // Reset when closing
          }}
          className="p-4 before:absolute before:inset-y-0 before:left-0 before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-[#FFE395] before:to-transparent"
        >
          <div
            className={`mb-6 flex items-center ${
              isSold ? "justify-end" : "justify-between"
            } `}
          >
            {!isSold && (
              <h1
                className="text-[16px] font-bold lg:text-[24px] leading-[1.2] lg:leading-[20px] uppercase"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SELL MY PIXEL
              </h1>
            )}

            <IconButton
              className="bg-transparent text-[25px] text-[#FFE395]"
              onClick={() => {
                closeDrawer(false);
                setIsSold(false);
              }}
            >
              <IoClose />
            </IconButton>
          </div>

          {isSold ? (
            // Success Screen
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div className="flex flex-col items-center gap-4">
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
                    <img src={successIcon} alt="" />
                  </div>
                </div>
                <h1
                  className="text-[16px] font-bold lg:text-[24px] leading-[1.2] lg:leading-[20px] uppercase"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  LISTED Successfully
                </h1>
                <p className="font-[Montserrat] font-normal text-[16px] text-white">
                  Your pixel has been listed successfully for sell. you will get
                  notify about next move.
                </p>
              </div>
            </div>
          ) : (
            // Selling Options
            <>
              <h1 className="text-white font-[Inter] font-semibold text-[16px] uppercase">
                Select Your Selling Method
              </h1>

              <div className="mt-4">
                <div className="flex items-center">
                  <Checkbox
                    ripple={false}
                    icon={<div className="h-4 w-4 bg-[#FEDB6B]"></div>}
                    checkedIcon={<div className="h-4 w-4 bg-[#FEDB6B]"></div>}
                    className="h-6 w-6 rounded-none"
                    style={{
                      border: "1px solid",
                      borderImage:
                        "linear-gradient(to bottom, #ffe39566, #FFE395) 1",
                    }}
                    checked={selectedMethod === "direct"}
                    onChange={() => setSelectedMethod("direct")}
                  />
                  <p className="font-semibold text-white font-[Inter] text-[16px]">
                    Direct Sell{" "}
                  </p>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    ripple={false}
                    icon={<div className="h-4 w-4 bg-[#FEDB6B]"></div>}
                    checkedIcon={<div className="h-4 w-4 bg-[#FEDB6B]"></div>}
                    className="h-6 w-6 rounded-none"
                    style={{
                      border: "1px solid",
                      borderImage:
                        "linear-gradient(to bottom, #ffe39566, #FFE395) 1",
                    }}
                    checked={selectedMethod === "auction"}
                    onChange={() => setSelectedMethod("auction")}
                  />
                  <p className="font-semibold text-white font-[Inter] text-[16px]">
                    Auction Sell{" "}
                  </p>
                </div>
              </div>

              {selectedMethod === "direct" && (
                <div className="mt-8">
                  <p className="uppercase font-[Inter] text-[14px] font-light text-white">
                    Set Your Value<span className="text-[#FEDB6B]">*</span>
                  </p>
                  <input
                    className="px-4 py-3 border bg-[#000000] border-[#766E53] text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase w-full"
                    required
                  />
                </div>
              )}
              {selectedMethod === "auction" && (
                <>
                  <div className="mt-8">
                    <p className="uppercase font-[Inter] text-[14px] font-light text-white">
                      Set Your Minimum Value
                      <span className="text-[#FEDB6B]">*</span>
                    </p>
                    <input
                      className="px-4 py-3 border bg-[#000000] border-[#766E53] text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase w-full"
                      required
                    />
                  </div>
                  <div className="mt-8">
                    <h1 className="text-white font-[Inter] font-semibold text-[16px] uppercase">
                      Set Timer
                    </h1>
                    <div className="flex items-center gap-3 mt-4">
                      <TimerInput label="Hours" />
                      <TimerInput label="Minutes" />
                      <TimerInput label="Seconds" />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {!isSold && (
            <div className="absolute bottom-4 left-4 right-4">
              <CustomButton
                py="py-4"
                hidden="block"
                name={"Sell"}
                onClick={handleSell}
                width="w-full"
                bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
                strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
              />
            </div>
          )}
        </Drawer>
      </ThemeProvider>
    </div>
  );
};

export default AuctionDrawer;
