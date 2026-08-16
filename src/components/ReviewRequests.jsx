import React, { useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { showToast } from "../utils/toastGlobalSlice";
import { useDispatch } from "react-redux";

const ReviewRequests = () => {
  const [error, setError] = useState("");
  const toastTimer = useRef(null);
  const [reviewRequests, setReviewRequests] = useState(null);
  const dispacth = useDispatch();

  const handleRequestReview = async (status, _id) => {
    try {
      const reviewRes = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      setReviewRequests((prev) =>
        prev.filter((reviewRequest) => reviewRequest._id !== _id),
      );

      dispacth(
        showToast({ message: reviewRes?.data?.message, type: "success" }),
      );
    } catch (err) {
      dispacth(
        showToast({ message: err?.response?.data?.message, type: "error" }),
      );
      setError(
        err?.response?.data?.message || "Something went crazy with review",
      );
    }
  };

  const getReviewRequests = async () => {
    try {
      const reviewRequestsRes = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        },
      );
      setReviewRequests(reviewRequestsRes.data?.data);
      dispacth(
        showToast({
          message: reviewRequestsRes.data?.message,
          type: "success",
        }),
      );
    } catch (err) {
      dispacth(
        showToast({ message: err?.response?.data?.message, type: "error" }),
      );
      setError(err?.response?.data?.message || "Something went crazy");
    }
  };

  useEffect(() => {
    getReviewRequests();
  }, []);
  if (reviewRequests && reviewRequests.length == 0)
    return (
      <h1 className=" flex text-lg items-center justify-center">
        You have no pending requests to review (●'◡'●)
      </h1>
    );

  return (
    <div className=" grid justify-center p-4 gap-2">
      <h1 className="text-lg text-center justify-center-safe">
        Requests Received (●'◡'●)
      </h1>
      {reviewRequests?.map((reviewRequest) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          reviewRequest.fromUserId;
        return (
          <div
            key={_id}
            className="aura aura-holo aura-xs accent-neutral-100 m-2.5"
          >
            <div className="card bg-base-300 mx-auto w-full max-w-md">
              <div className="flex card-body flex-row items-center gap-4">
                <div className="w-20 h-20 shrink-0">
                  <img
                    alt="cnctn_req_photo"
                    className="rounded-full w-full h-full object-cover"
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
                <div className="flex flex-col sm:flex-row gap-2 ml-auto shrink-0">
                  <button
                    id="ignore"
                    className="btn btn-outline btn-error btn-sm"
                    onClick={
                      () => handleRequestReview("rejected", reviewRequest._id) //id of the connection request not the user
                    }
                  >
                    Ignore
                  </button>
                  <button
                    id="accept"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      handleRequestReview("accepted", reviewRequest._id)
                    }
                  >
                    Accept
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

export default ReviewRequests;
