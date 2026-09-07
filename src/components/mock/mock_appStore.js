import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../utils/userSlice";

export const MOCK_DATA = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      firstName: "Tony",
      lastName: "Stark",
      email: "tony@avenger.com",
    },
  },
});
