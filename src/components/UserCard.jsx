import React, {
  useEffect,
  useState,
  useOptimistic,
  startTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { removeUserFromFeed } from "../utils/feedSlice";
import Toast from "./Toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ userdata, onToast }) => {
  const [isRemoved, setIsRemoved] = useOptimistic(false);
  const location = useLocation();
  const feedConnections = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const handleSendRequest = (status, _id) => {
    startTransition(async () => {
      setIsRemoved(true);
      try {
        const feedRes = await axios.post(
          BASE_URL + "/request/send/" + status + "/" + _id,
          {},
          { withCredentials: true },
        );
        onToast(feedRes?.data?.message, "success");
        // await new Promise(() =>
        //   setTimeout(() => {
        //     dispatch(removeUserFromFeed(_id));
        //   }, 5000),
        // );
        dispatch(removeUserFromFeed(_id));
      } catch (err) {
        onToast(
          err?.response?.data?.message || "Something went wrong",
          "error",
        );
      }
    });
  };
  if (isRemoved) {
    return null;
  }

  return (
    <div>
      <div
        className="card bg-base-300 w-96 shadow-sm gap-6 my-5"
        id={userdata._id}
      >
        <figure className="max-h-90 min-h-50">
          <img src={userdata.photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {userdata?.firstName + " " + userdata?.lastName}
          </h2>
          {userdata?.age && userdata?.gender && (
            <p className="text justify-center">
              {userdata.age} ● {userdata.gender}
            </p>
          )}
          <p>{userdata.about}</p>
          {userdata?.skills && (
            <div className="grid grid-cols-3 gap-2 mt-3 w-full">
              {userdata.skills.map((skill, index) => (
                <span
                  className="wrap-word-break whitespace-normal line-clamp-2"
                  key={index}
                >
                  📌{skill}
                </span>
              ))}
            </div>
          )}
          {location.pathname !== "/profile" && (
            <div className="card-actions justify-center gap-3 mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => handleSendRequest("ignored", userdata._id)}
              >
                IGNORE
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("interested", userdata._id)}
              >
                INTERESTED
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
