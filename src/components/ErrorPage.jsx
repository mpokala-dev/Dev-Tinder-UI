import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ ...props }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Something went wrong</h2>
      {props.error?.message && <div>{props.error.message}</div>}
      <p>
        We're sorry — an unexpected error occurred. You can try again after
        moving to your feed page.
      </p>
      <button
        onClick={() => {
          props.error?.message.includes("jwt expired")
            ? navigate("/login", { replace: true })
            : navigate("/", { replace: true });
        }}
      >
        Go To Feed
      </button>
    </div>
  );
};

export default ErrorPage;
