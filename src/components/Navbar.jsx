import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfilePhoto(user.photoURL || "");  
    }
  }, [user]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Sign-out error:", error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="px-3 py-2 rounded-md text-black transition-all duration-300 bg-white hover:bg-gray-200"
        >
          Home
        </NavLink>
        
      </li>
      <li>
      <NavLink
          to="category/Sci-Fi"
          className="px-3 py-2 rounded-md text-black transition-all duration-300 bg-white hover:bg-gray-200"
        >
          Sci-Fi
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-book"
              className="bg-white px-3 py-2 rounded-md text-black transition-all duration-300 hover:bg-gray-200"
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-books"
              className="px-3 py-2 rounded-md text-black transition-all duration-300 bg-white hover:bg-gray-200"
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/borrowed-books"
              className="px-3 py-2 rounded-md text-black transition-all duration-300 bg-white hover:bg-gray-200"
            >
              Borrowed Books
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar fixed top-0 left-0 right-0 bg-slate-400 shadow-md backdrop-blur-xl z-50">
      <div className="navbar-start ml-2 md:ml-20">
        <div className="dropdown md:hidden z-20">
          <button className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img
            className="lg:w-12 md:w-10 w-8"
            src="https://i.ibb.co/tYqWvwm/logo.png"
            alt="Library Management Logo"
          />
        </Link>
      </div>

      <div className="navbar-center hidden md:flex lg:flex">
        <ul className="menu gap-4 menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end mr-5 md:mr-20">
        {user ? (
          <div className="relative group">
            <img
              src={profilePhoto || "https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <div className="absolute right-0 hidden group-hover:flex flex-col bg-white border border-gray-300 shadow-lg p-3 rounded-lg w-48 z-50">
              <span className="font-bold text-black text-center block mb-2">
                {user.displayName || "User"}
              </span>
              <button
                onClick={handleSignOut}
                className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;