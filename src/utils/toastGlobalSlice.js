import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toast: {
    show: false,
    message: "",
    type: ["success", "error", "info"],
  },
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast.show = true;
      state.toast.message = action.payload.message;
      state.toast.type = action.payload.type;
    },
    hideToast: (state) => {
      state.toast.show = false;
      state.toast.message = "";
      state.toast.type = "info";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
