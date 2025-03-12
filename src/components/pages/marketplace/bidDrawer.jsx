import {
  Checkbox,
  Drawer,
  IconButton,
  ThemeProvider,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import CustomButton from "../../button";
import { PiInfoBold } from "react-icons/pi";
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
const BidDrawer = ({ closeDrawer, open, itemData }) => {
  return (
    <div>
      <ThemeProvider value={theme}>
        <Drawer
          open={open}
          placement="right"
          size={395}
          onClose={() => {
            closeDrawer(false);
          }}
          className="p-4 before:absolute before:inset-y-0 before:left-0 before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-[#FFE395] before:to-transparent"
        >
          <div
            className={`mb-6 flex items-center 
               justify-between
             `}
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
              Place bid
            </h1>

            <IconButton
              className="bg-transparent text-[25px] text-[#FFE395]"
              onClick={() => {
                closeDrawer(false);
              }}
            >
              <IoClose />
            </IconButton>
          </div>

          <div className="mt-2 p-2 border-[1px] border-[#feea9a14] bg-[#3636363d] flex items-center gap-4">
            <div
              style={{
                width: "64px",
                height: "97px",
                backgroundImage: `url(${itemData?.userProfile})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="text-[#FEDB6B] font-semibold text-[16px]">
                  {itemData?.name}
                </p>
                <p className="text-[#FEDB6B] font-semibold text-[16px]">
                  {itemData?.followers}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#feea9a9c] font-light text-[12px]">
                  {itemData?.username}
                </p>
                <p className="text-[#feea9a9c] font-light text-[12px]">
                  Followers
                </p>
              </div>
              <div className="w-full h-[1px] bg-[#FEF6C026] mt-2 mb-2"></div>
              <div className="flex items-center justify-between">
                <p className="text-[#feea9a9c] font-light text-[12px]">
                  Reserve Price
                </p>
                <p className="text-[#FEDB6B] font-semibold text-[16px]">
                  {itemData?.price}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="uppercase font-[Inter] text-[14px] font-light text-white">
              Enter Your Value<span className="text-[#FEDB6B]">*</span>
            </p>
            <input
              className="px-4 py-3 border bg-[#000000] border-[#766E53] text-white placeholder:text-[#aaa] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase w-full"
              required
            />
            <div className="mt-4">
              {" "}
              <p className="font-[Montserrat] text-[16px] text-[#766E53] flex items-center gap-2">
                <PiInfoBold size={24} /> The value should not be less then
                reserve price
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <CustomButton
              py="py-4"
              hidden="block"
              name={"Place Bid"}
              //   onClick={handleSell}
              width="w-full"
              bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
              strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
            />
          </div>
        </Drawer>
      </ThemeProvider>
    </div>
  );
};

export default BidDrawer;
