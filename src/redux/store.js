import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";

const combineReducer = {
  user: userReducer,
};
export const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// store.dispatch(getNavbarData());
// store.dispatch(getSliderData());
// store.dispatch(getNewArrivalData());
// store.dispatch(getAllprimaryCategory());
// store.dispatch(getAllProductsData());
