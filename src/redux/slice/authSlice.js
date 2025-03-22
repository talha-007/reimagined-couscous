import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authServices";

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Async Thunks for login and signup
export const loginUser = createAsyncThunk(
  "auth/login",
  async (datas, thunkAPI) => {
    try {
      const res = await authService.login(datas);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  "auth/googleLogin",
  async (_, thunkAPI) => {
    try {
      const res = await authService.googleLogin();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (datas, thunkAPI) => {
    try {
      const res = await authService.signup(datas);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
