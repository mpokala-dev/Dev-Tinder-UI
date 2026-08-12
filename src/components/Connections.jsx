import React, { useEffect, useState } from "react";
import Toast from "./Toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState("info");
  const [connections, setConnections] = useState(null);
  const getConnections = async () => {
    try {
      const connectionsRes = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(connectionsRes.data?.data);
      setToastMessage(connectionsRes.data?.message);
      setToastStatus("success");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 5000);
    } catch (err) {
      setToastMessage(err?.response?.data?.message);
      setToastStatus("error");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 5000);
      setError(err?.response?.data?.message || "Something went crazy");
    }
  };
  useEffect(() => {
    console.log(connections, toastMessage);
  }, [connections, toastStatus]);
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
      {showToast && <Toast message={toastMessage} toatstType={toastStatus} />}

      <h1 className="text-lg text-center justify-center-safe">
        Your Connections (●'◡'●)
      </h1>
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
