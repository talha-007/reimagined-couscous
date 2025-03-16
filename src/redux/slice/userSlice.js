import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileServices from "../services/profileServices";

export const initialState = {
  data: [],
  loading: "idle",
  error: null,
  message: null,
};

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    try {
      const res = await profileServices.getUserProfile();
      return res?.data;
    } catch (error) {
      return error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.data = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default userSlice.reducer;
