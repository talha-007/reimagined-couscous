import {
  Checkbox,
  Drawer,
  IconButton,
  ThemeProvider,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";
import CustomButton from "../../button";
import { PiInfoBold } from "react-icons/pi";
import { IMAGE_BASEURL } from "../../../redux/services/http-comman";
import marketPlaceServices from "../../../redux/services/marketplaceServices";
import { useState } from "react";
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
  const [price, setPrice] = useState("");
  const [error, setError] = useState(""); // State to track error message

  const handleBid = async () => {
    alert("Bid placed successfully!");
    const datas = {
      bidPrice: Number(price),
    };
    try {
      alert("Bid placed successfully!");
      const res = await marketPlaceServices.createBid(itemData?._id, datas);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
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
          }}
          className="p-4 before:absolute before:inset-y-0 before:left-0 before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-[#FFE395] before:to-transparent"
        >
          <div className="mb-6 flex items-center justify-between">
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
                width: "84px",
                height: "97px",
                backgroundImage: `url(${
                  IMAGE_BASEURL +
                  itemData?.userId?.profilePicture?.replace(/\\/g, "/")
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="text-[#FEDB6B] font-semibold text-[16px]">
                  {itemData?.userId?.firstName} {itemData?.userId?.lastName}
                </p>
                <p className="text-[#FEDB6B] font-semibold text-[16px]">
                  {itemData?.followers ? itemData?.followers : "N/A"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#feea9a9c] font-light text-[12px]">
                  {itemData?.userId?.username}
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
                  ${itemData?.price ? itemData?.price?.toLocaleString() : 0}
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
              value={price}
              onChange={(e) => {
                const value = e.target.value;

                // Allow only numbers using regex
                if (/^\d*$/.test(value)) {
                  setPrice(value);

                  // Show error if the price is less than the reserve price
                  if (Number(value) < Number(itemData?.price)) {
                    setError(
                      "The entered price cannot be less than the reserve price."
                    );
                  } else {
                    setError(""); // Clear error if the price is valid
                  }
                }
              }}
              placeholder="Enter your value"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4">
              <p className="font-[Montserrat] text-[16px] text-[#766E53] flex items-center gap-2">
                <PiInfoBold size={24} /> The value should not be less than the
                reserve price
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <CustomButton
              py="py-4"
              hidden="block"
              name={"Place Bid"}
              onClick={handleBid}
              width="w-full"
              disabled={error}
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
