import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Toast from "./Toast";

const Feed = () => {
  const [error, setError] = useState("");
  const [feedMsg, setFeedMsg] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const toastTimer = useRef(null);
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const showToast = (message, type = "success") => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast({ show: true, message, type });
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 5000);
  };

  const getFeedAPI = async () => {
    if (feed) return;
    try {
      const userFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(userFeed?.data?.data));
      setFeedMsg(userFeed?.data?.message);
      console.log("userFeed.data::", userFeed.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Something is wrong.");
    }
  };
  useEffect(() => {
    console.log("redux feed", feed);
    getFeedAPI();
  }, []);
  if (feed && feed.length == 0)
    return (
      <div>
        {toast.show && <Toast message={toast.message} toastType={toast.type} />}
        <h1 className=" flex text-lg items-center justify-center">
          No more users feed (●'◡'●)
        </h1>
      </div>
    );
  return (
    feed && (
      <div className="min-h-screen flex flex-col items-center justify-center my-10">
        <p className="text-xl font-semibold">
          {error !== "" ? error : feedMsg}
        </p>
        {toast.show && <Toast message={toast.message} toastType={toast.type} />}
        {feed?.map((userdata) => (
          <UserCard
            key={userdata._id}
            userdata={userdata}
            onToast={showToast}
          />
        ))}
      </div>
    )
  );
};

export default Feed;
