import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  ThemeProvider,
} from "@material-tailwind/react";

import closeBtn from "../../../assets/icons/close btn.svg";
import CustomButton from "../../button";

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
const Popup = ({ open, close, head, text, btnText }) => {
  return (
    <ThemeProvider value={customTheme}>
      <Dialog
        open={open}
        handler={close}
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
                className="text-[16px] font-bold lg:text-[20px] leading-[1.2] lg:leading-[20px] uppercase"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {head}
              </h1>
              <p className="text-[16px] lg:text-[16px] text-[#FFF8C5] font-light">
                {text}
              </p>
            </div>
            <IconButton onClick={close}>
              <img src={closeBtn} alt="close-btn" />
            </IconButton>
          </div>
        </DialogHeader>
        <DialogBody>
          <CustomButton
            py="py-4"
            hidden="block"
            name={btnText}
            onClick={close}
            width="w-full"
            bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
            strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
          />
        </DialogBody>
      </Dialog>
    </ThemeProvider>
  );
};

export default Popup;
