import React, { useEffect, useState } from "react";
// import Toast from "./Toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ErrorPage from "./ErrorPage";
import { showToast } from "../utils/toastGlobalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const toast = useSelector((state) => state.globalToast.toast);
  const [connections, setConnections] = useState(null);
  const navigate = useNavigate();

  const handleChatClick = (chatUserId) => {
    navigate("/chat/" + chatUserId);
  };

  const getConnections = async () => {
    try {
      const connectionsRes = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(
        showToast({ message: connectionsRes.data?.message, type: "success" }),
      );
      setConnections(connectionsRes.data?.data);
    } catch (err) {
      dispatch(
        showToast({
          message: err?.response?.data?.message || "Something went wrong",
          type: "error",
        }),
      );
      setError(err?.response?.data?.message || "Something went crazy");
      if (err?.response?.status === 401 || err?.response?.status === 400) {
        //show toast with message
        navigate("/login", { replace: true });
      } else {
        <ErrorPage error={err.response?.data} />;
      }
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  if (connections && connections.length == 0)
    return (
      <h1 className="text-lg justify-center-safe">
        You have no connections to view, make some friends (●'◡'●)
      </h1>
    );
  return (
    <div className=" grid justify-center p-4 gap-2">
      {/* {toast.show && <Toast message={toast.message} toatstType={toast.type} />} */}
      {connections && (
        <h1 className="text-lg text-center justify-center-safe">
          Your Connections (●'◡'●)
        </h1>
      )}
      {connections?.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          connection;
        return (
          <div
            key={_id}
            className="aura aura-holo aura-xs accent-neutral-100 m-2.5"
          >
            <div className="card bg-base-300 mx-auto w-full max-w-md">
              <div className="flex card-body flex-row items-center gap-4">
                <div className="w-20 h-20 shrink-0">
                  <img
                    alt="connection_photo"
                    className="rounded-full w-full h-full"
                    src={photoUrl}
                  />
                </div>
                <div className="text-left mx-4 ">
                  <h2>
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p>
                      {age} ● {gender}
                    </p>
                  )}
                  <p className="wrap-break-word whitespace-normal line-clamp-3 max-w-full">
                    {about}
                  </p>
                </div>
                <div className="text-right mx-4">
                  <button
                    className="btn btn-xs sm:btn-sm md:btn-md btn-outline"
                    onClick={() => handleChatClick(_id)}
                  >
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
