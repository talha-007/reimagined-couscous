import { createSlice } from "@reduxjs/toolkit";

// Load step from localStorage or default to 0
const getSavedStep = () => {
  const savedStep = localStorage.getItem("activeStep");
  return savedStep ? JSON.parse(savedStep) : 0;
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    activeStep: getSavedStep(), // Load saved step
  },
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
      localStorage.setItem("activeStep", JSON.stringify(action.payload)); // Save to localStorage
    },
    clearStepper: (state) => {
      state.activeStep = 0;
      localStorage.removeItem("activeStep"); // Clear on finish/reset
    },
  },
});

export const { setActiveStep, clearStepper } = stepperSlice.actions;
export default stepperSlice.reducer;
