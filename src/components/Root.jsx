import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Root = () => {
  const contactRef = useRef(null); // Create a ref for the Contact section

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar scrollToContact={scrollToContact} />

      {/* Main Content */}
      <div className="mx-auto mt-[90px]">
        <Outlet context={{ contactRef }} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Root;
