import { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import ErrorPage from "./ErrorPage";

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
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
