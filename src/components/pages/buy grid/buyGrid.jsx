import Layout from "../../layout/layout";
import { useEffect, useState } from "react";
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
import Navbar from "../../navbar";
import { useNavigate } from "react-router-dom";

const BuyGrid = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile: {},
    selectPixels: {},
    pixelInfo: {},
    checkout: {},
  });
  console.log("form data", formData);

  const steps = [
    "Profile Creation",
    "Select Pixels",
    "Pixel Information",
    "Checkout",
    "Finish",
  ];
  useEffect(() => {
    const savedStep = JSON.parse(localStorage.getItem("activeStep"));
    const savedData = JSON.parse(localStorage.getItem("stepperFormData"));
    if (savedStep !== null) setActiveStep(savedStep);
    if (savedData) setFormData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("activeStep", JSON.stringify(activeStep));

    return () => {
      localStorage.removeItem("activeStep"); // Remove on component unmount
    };
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const updateFormData = (step, data) => {
    const updatedData = { ...formData, [step]: data };
    setFormData(updatedData);
    localStorage.setItem("stepperFormData", JSON.stringify(updatedData));
  };

  const handleFinish = () => {
    navigate("/pixel-grid");
    setActiveStep(0);
    setFormData({
      profile: {},
      selectPixels: {},
      pixelInfo: {},
      checkout: {},
    });
    localStorage.removeItem("stepperFormData");
    localStorage.removeItem("selectionSummary");
  };

  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden">
      <Navbar />
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
                // onClick={() => setActiveStep(index)}
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
      {activeStep === 0 && (
        <ProfileCreation
          handleNext={handleNext}
          updateFormData={updateFormData}
        />
      )}
      {activeStep === 1 && (
        <SelectPixels handleNext={handleNext} updateFormData={updateFormData} />
      )}
      {activeStep === 2 && (
        <PixelInformation
          handleNext={handleNext}
          updateFormData={updateFormData}
        />
      )}
      {activeStep === 3 && (
        <Checkout handleNext={handleNext} updateFormData={updateFormData} />
      )}
      {activeStep === 4 && <FinishScreen handleSubmit={handleFinish} />}
      {/* Navigation Buttons */}
    </div>
  );
};

export default BuyGrid;
