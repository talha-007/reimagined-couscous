import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import influencerProfileServices from "../services/influencerProfileServices";

export const initialState = {
  data: [],
  loading: "idle",
  error: null,
  message: null,
};

export const getInfluencers = createAsyncThunk(
  "influencers/getInfluencers",
  async () => {
    try {
      const res = await influencerProfileServices.getInfluencer();
      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

const influencerSlice = createSlice({
  name: "influencers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfluencers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getInfluencers.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.data = action.payload;
    });
    builder.addCase(getInfluencers.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default influencerSlice.reducer;
