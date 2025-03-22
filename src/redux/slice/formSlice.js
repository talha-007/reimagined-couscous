import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  selectionSummary: null, // Added selectionSummary here
  saveSelection: false, // Added flag to track selection status
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { step, data } = action.payload;
      state.formData = { ...state.formData, [step]: data };
    },
    saveSelectionSummary: (state, action) => {
      console.log("Action", action);

      state.selectionSummary = action.payload;
      state.saveSelection = true;
    },
    clearFormData: (state) => {
      state.formData = {};
      state.selectionSummary = null; // Clear selection summary when resetting form
      state.saveSelection = false;
    },
  },
});

export const { updateFormData, saveSelectionSummary, clearFormData } =
  formSlice.actions;
export default formSlice.reducer;
