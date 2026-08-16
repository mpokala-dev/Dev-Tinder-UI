import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import toastSlice from "./toastGlobalSlice";

const appStore = configureStore({
  reducer: { user: userReducer, feed: feedSlice, globalToast: toastSlice },
});

export default appStore;
