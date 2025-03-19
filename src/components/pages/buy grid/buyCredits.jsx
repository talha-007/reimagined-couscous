import {
  Dialog,
  DialogHeader,
  DialogBody,
  ThemeProvider,
  IconButton,
  Radio,
} from "@material-tailwind/react";
import closeBtn from "../../../assets/icons/close btn.svg";
import cardIcon from "../../../assets/icons/card.svg";
import visa from "../../../assets/icons/visa.svg";
import { useState } from "react";
import { useCountries } from "use-react-countries";
import CustomButton from "../../button";
import bitcoin from "../../../assets/icons/bitcoin.png";
import bnb from "../../../assets/icons/bnb.png";
import eth from "../../../assets/icons/eth.png";
import usdt from "../../../assets/icons/usdt.png";

const customTheme = {
  dialog: {
    styles: {
      base: {
        backdrop: {
          backgroundColor: "#00000024",
        },
      },
    },
  },
  radio: {
    valid: {
      colors: ["yellow"],
    },
    styles: {
      colors: {
        yellow: {
          color: "#FEDB6B",
          border: "checked:border-[#FEDB6B]",
          before: "checked:before:bg-[#FEDB6B]",
        },
      },
    },
  },
};

const BuyCredits = ({ open, handleClose, handleOpenPay }) => {
  const handleOpenPayModel = () => {
    handleClose();
    handleOpenPay();
  };
  return (
    <ThemeProvider value={customTheme}>
      <Dialog
        open={open}
        handler={handleClose}
        size="sm"
        style={{
          background: "#000",
          border: "1px solid #feea9a14",
          borderRadius: "0px",
        }}
      >
        <DialogHeader>
          <div className="flex justify-between items-start w-full">
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
                you don’t have enough credits.
              </h1>
              <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
                Buy Credits to complete the purchase
              </p>
            </div>
            <IconButton onClick={handleClose}>
              <img src={closeBtn} alt="close-btn" />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="mt-8">
            <CustomButton
              py="py-4"
              hidden="block"
              name={"Buy Credits"}
              onClick={handleOpenPayModel}
              width="w-full"
              bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
              strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
            />
          </div>
        </DialogBody>
      </Dialog>
    </ThemeProvider>
  );
};

export default BuyCredits;
