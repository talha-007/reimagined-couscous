import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import influencerReducer from "./slice/InfluencerSlice";
import formReducer from "./slice/formSlice";
import authReducer from "./slice/authSlice";
import stepperReducer from "./slice/stepperSlice";

const combineReducer = {
  auth: authReducer,
  user: userReducer,
  influencer: influencerReducer,
  form: formReducer,
  stepper: stepperReducer,
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
