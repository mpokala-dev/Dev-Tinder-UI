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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  const limit = 10;

  const showToast = (message, type = "success") => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast({ show: true, message, type });
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 5000);
  };

  const getFeedAPI = async (pageParam = 1) => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/user/feed?page=${pageParam}&limit=${limit}`,
        {
          withCredentials: true,
        },
      );
      const newData = res?.data?.data || [];
      const userFeed =
        pageParam === 1 ? newData : [...(feed || []), ...newData];
      dispatch(addFeed(userFeed));
      setFeedMsg(res?.data?.message);
      if (newData.length < limit) setHasMore(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Something is wrong.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!feed || feed.length === 0) getFeedAPI(1);
  }, []);

  // intersection observer to load more
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            getFeedAPI(nextPage);
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [page, hasMore, loading, feed]);

  // if (feed?.length == 0)
  //   return (
  //     <div>
  //       {toast.show && <Toast message={toast.message} toastType={toast.type} />}
  //       <h1 className=" flex text-lg items-center justify-center">
  //         No more users feed (●'◡'●)
  //       </h1>
  //     </div>
  //   );
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
        {loading && <p className="mt-4">Loading...</p>}
        <div ref={sentinelRef} />
      </div>
    )
  );
};

export default Feed;
