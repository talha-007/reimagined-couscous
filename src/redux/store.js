import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import influencerReducer from "./slice/InfluencerSlice";

const combineReducer = {
  user: userReducer,
  influencer: influencerReducer,
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
