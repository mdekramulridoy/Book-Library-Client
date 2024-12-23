import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { auth } from "../firebase.init";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState("");

  const navigate = useNavigate();

  // Fetch and set the profile photo
  useEffect(() => {
    if (user) {
      const fetchPhoto = async () => {
        try {
          await auth.currentUser.reload(); // Reload user profile
          const updatedUser = auth.currentUser;
          setProfilePhoto(updatedUser.photoURL || "");
        } catch (error) {
          console.error("Error fetching user photo:", error.message);
          setProfilePhoto(""); // Fallback if error occurs
        }
      };

      fetchPhoto();
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

  return (
    <div className="">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="lg:w-12 md:w-10 w-8"
              src="https://i.ibb.co/tYqWvwm/logo.png"
              alt="Library Management Logo"
            />
          </Link>
        </div>

        <div className="navbar-center hidden md:flex lg:flex">
          <ul className="menu gap-2 menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className="px-3 py-2 rounded-md text-black transition-all duration-300 border"
              >
                Home
              </NavLink>
            </li>
            {!user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="px-3 py-2 rounded-md transition-all duration-300 text-black border"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="px-3 py-2 rounded-md transition-all duration-300 text-black border"
                  >
                    SignUp
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="relative group">
              {/* User Avatar */}
              <img
                src={
                  profilePhoto ||
                  "https://i.ibb.co/ph6PK0H/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              {/* Dropdown */}
              <div className="absolute right-0 hidden group-hover:flex flex-col bg-white border border-gray-300 shadow-lg p-3 rounded-lg w-48 z-50">
                <span className="font-bold text-black text-center">
                  {user.displayName || "User"}
                </span>
                {profilePhoto && (
                  <img
                    src={profilePhoto}
                    alt="User Profile"
                    className="w-16 h-16 rounded-full mx-auto mt-2"
                  />
                )}
                <button
                  onClick={handleSignOut}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
