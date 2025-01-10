import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Root = () => {
  return (
    <div className=" min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className=" mx-auto mt-[90px]">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Root;
