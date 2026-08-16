import React from "react";

const Toast = ({ message, toatstType = "info" }) => {
  const messageContent = message ? message : "Unable to fetch message";
  const typeClass = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };
  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${typeClass[toatstType]}`}>
        <span>{messageContent}</span>
      </div>
    </div>
  );
};

export default Toast;
