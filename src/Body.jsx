import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <Navbar />

      <h1 className="text-3xl font-bold underline">Hello Dev-Tinder</h1>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
