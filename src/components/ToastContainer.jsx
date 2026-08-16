import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import { hideToast } from "../utils/toastGlobalSlice";

const ToastContainer = () => {
  const toast = useSelector((state) => state.globalToast.toast);
  const dispatch = useDispatch();
  const toastRef = useRef(null);

  useEffect(() => {
    if (!toast.show) return;

    if (toastRef.current) {
      clearTimeout(toastRef.current);
    }
    toastRef.current = setTimeout(() => {
      dispatch(hideToast());
    }, 5000);

    return () => clearTimeout(toastRef.current);
  }, [toast.show, toast.message]);

  if (!toast.show) return;

  return (
    <div>
      <Toast message={toast.message} toatstType={toast.type} />
    </div>
  );
};

export default ToastContainer;
