import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import marketPlaceServices from "../services/marketplaceServices";

export const initialState = {
  data: [],
  bids: [],
  loading: "idle",
  error: null,
  message: null,
};

export const getMarketPlaces = createAsyncThunk(
  "markets/getAllMarketPlace",
  async () => {
    try {
      const res = await marketPlaceServices.getAllMarketPlace();
      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

export const getBids = createAsyncThunk("markets/getAllBids", async () => {
  try {
    const res = await marketPlaceServices.getAllBids();
    return res?.data;
  } catch (error) {
    return error;
  }
});

const marketPlaceSlice = createSlice({
  name: "markets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarketPlaces.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getMarketPlaces.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.data = action.payload;
    });
    builder.addCase(getMarketPlaces.rejected, (state) => {
      state.loading = "rejected";
    });
    builder.addCase(getBids.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBids.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.bids = action.payload;
    });
    builder.addCase(getBids.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default marketPlaceSlice.reducer;
