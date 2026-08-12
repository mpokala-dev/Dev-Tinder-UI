import React from "react";

const Toast = ({ message, toatstType = "info" }) => {
  const messageContent = message ? message : "Unable to fetch message";
  return (
    <div className="toast toast-top toast-end">
      {toatstType == "info" && (
        <div className="alert alert-info">
          <span>{messageContent}</span>
        </div>
      )}
      {toatstType == "success" && (
        <div className="alert alert-success">
          <span>{messageContent}</span>
        </div>
      )}
      {toatstType == "error" && (
        <div className="alert alert-error">
          <span>{messageContent}</span>
        </div>
      )}
    </div>
  );
};

export default Toast;
