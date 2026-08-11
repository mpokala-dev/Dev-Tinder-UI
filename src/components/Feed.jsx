import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const [error, setError] = useState("");
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const getFeedAPI = async () => {
    if (feed) return;
    try {
      const userFeed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(userFeed.data));
      console.log("userFeed.data::", userFeed.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Something is wrong.");
    }
  };
  useEffect(() => {
    getFeedAPI();
  }, []);
  return (
    feed && (
      <div className="min-h-screen flex flex-col items-center justify-center my-10">
        <p className="text-xl font-semibold">
          {error !== "" ? error : feed.message}
        </p>
        {feed.data &&
          feed.data.map((userdata) => (
            <UserCard key={userdata._id} userdata={userdata} />
          ))}
      </div>
    )
  );
};

export default Feed;
