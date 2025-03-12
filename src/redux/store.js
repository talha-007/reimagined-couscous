import { configureStore } from "@reduxjs/toolkit";

const combineReducer = {};
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
