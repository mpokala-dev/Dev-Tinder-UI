import { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import ErrorPage from "./ErrorPage";
import ToastContainer from "./ToastContainer";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((state) => state.user);

  const getUserDetails = async () => {
    if (userData) return;
    try {
      const userInfo = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(userInfo.data));
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 400) {
        //show toast with message
        navigate("/login", { replace: true });
      } else {
        <ErrorPage error={error} />;
      }
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userData && location.pathname === "/login") {
      navigate("/");
    }
  }, [userData, location.pathname, navigate]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ToastContainer />
      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
