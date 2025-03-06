import Layout from "../../layout/layout";
import { useState } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import ProfileCreation from "./profileCreation";
import CustomButton from "../../button";
import tick from "../../../assets/icons/tick.svg";
import SelectPixels from "./selectPixels";
import PixelInformation from "./pixelInformation";
import Checkout from "./checkout";
import PayModel from "./payModel";
import Popup from "./popup";
import FinishScreen from "./finishScreen";

const BuyGrid = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [OpenPayModel, setOpenPayModel] = useState(false);

  const [showSccessPopup, setShowSccessPopup] = useState(false);
  const steps = [
    "Profile Creation",
    "Select Pixels",
    "Pixel Information",
    "Checkout",
    "Finish",
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleOpenPay = () => {
    setOpenPayModel(true);
  };
  const handleShowSuccessPop = () => {
    setShowSccessPopup(true);
    setOpenPayModel(false);
  };
  const coins = 0;
  return (
    <>
      <Layout>
        <div className="flex flex-col items-center gap-6 p-8 pt-30 font-[Montserrat]">
          {/* Stepper Component */}
          <Stepper
            activeStep={activeStep}
            lineClassName="hidden"
            className="w-full max-w-5xl flex flex-wrap items-center justify-center md:justify-between gap-4 relative"
          >
            {steps.map((label, index) => (
              <div key={index} className="relative flex items-center">
                {/* Line Between Steps */}
                {index !== 0 && (
                  <div
                    className="absolute left-[-55px] top-1/2 transform -translate-y-1/2 w-[30px] h-[2px] md:w-[40px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #FEEA9A, #E8C776)",
                      opacity: 0.3,
                    }}
                  />
                )}

                {/* Step Box */}
                <Step
                  onClick={() => setActiveStep(index)}
                  style={{
                    height: "48px",
                    background: "#353535",
                    border: "1px solid #feea9a3d",
                    borderRadius: "0px",
                    maxWidth: "170px",
                    width: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  {/* Step Number */}
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, rgba(254, 246, 192, 0.14) 30%, rgba(232, 199, 118, 0.52) 150%)",
                      minHeight: "48px",
                      minWidth: "48px",
                      width: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#FEEA9A",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    {index < activeStep ? (
                      <img src={tick} alt="Completed" className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="p-2 text-center">
                    <p
                      className="text-[16px] font-medium text-[#fff8c74a]"
                      style={{ lineHeight: "20px" }}
                    >
                      {label}
                    </p>
                  </div>
                </Step>
              </div>
            ))}
          </Stepper>
        </div>
        {activeStep === 0 && <ProfileCreation />}
        {activeStep === 1 && <SelectPixels />}
        {activeStep === 2 && <PixelInformation />}
        {activeStep === 3 && <Checkout />}
        {activeStep === 4 && <FinishScreen />}
        {/* Navigation Buttons */}
        <div className="flex gap-4 max-w-5xl w-full justify-center mx-auto my-8">
          {activeStep === 3 && !coins > 0 ? (
            <CustomButton
              py="py-4"
              hidden="block"
              name="Pay Now"
              onClick={handleOpenPay}
              width="w-[200px] md:w-[400px]"
              bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
              strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
            />
          ) : (
            <CustomButton
              py="py-4"
              hidden="block"
              name={`${activeStep === 4 ? "Finish" : "Next"}`}
              onClick={handleNext}
              width="w-[200px] md:w-[400px]"
              bgGradient="linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)"
              strokeGradient="linear-gradient(to right, #7A5018cc 0%, #FEEA9Acc 100%)"
            />
          )}
        </div>
      </Layout>
      <PayModel
        open={OpenPayModel}
        handleClose={() => setOpenPayModel(false)}
        handleShowSuccessPop={handleShowSuccessPop}
      />
      <Popup
        open={showSccessPopup}
        close={() => setShowSccessPopup()}
        head={" Credits purchased succesfully"}
        text={"Credits are added in your credits vault"}
        btnText="Countinue"
      />
    </>
  );
};

export default BuyGrid;
