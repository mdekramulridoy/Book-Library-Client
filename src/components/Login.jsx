import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.init";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import loginAnimation from '../assets/lottie/login.json'


const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();

  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      console.log("Please provide a valid email address");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Reset email sent");
        })
        .catch((error) => {
          console.log("Error sending reset email: ", error.message);
        });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      e.target.reset();
      setError("");

      toast.success("Login successful! Welcome back.", {
        duration: 4000,
        style: {
          background: "#08ABE9",
          color: "#fff",
        },
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error(`Login failed: ${error.message}`, {
        duration: 4000,
        style: {
          background: "#E74C3C",
          color: "#fff",
        },
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
  
      // Reload the user's profile
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
  
      // Log to verify
      console.log("User photoURL:", updatedUser.photoURL);
  
      setError("");
  
      toast.success("Login successful! Welcome back.", {
        duration: 4000,
        style: {
          background: "#08ABE9",
          color: "#fff",
        },
      });
  
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error(`Google Sign-In failed: ${error.message}`, {
        duration: 4000,
        style: {
          background: "#E74C3C",
          color: "#fff",
        },
      });
    }
  };
  

  return (
    <div className="hero bg-base-200 min-h-screen">
      
      <div className="hero-content lg:flex-row md:flex-row flex-col">
         {/* here animation */}

         <div className="text-center lg:text-left">
          <Lottie animationData={loginAnimation}></Lottie>
        </div>

        {/* here animation */}
      
        <div className="card bg-base-100 w-full max-w-sm shrink-0">
        <div className="text-center pt-5">
          <h1 className="text-5xl font-bold text-black">Login now!</h1>
        </div>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input text-black input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input text-black input-bordered"
                required
              />
              <label className="label">
                <Link
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt text-blue-500 link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-3 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {error && <p className="text-center mb-2 text-red-600">{error}</p>}
          <p className="mb-4 text-center text-black">
            No Account ? Please{" "}
            <Link
              className="font-bold text-red-600 hover:underline"
              to="/register"
            >
              Sign Up
            </Link>
          </p>

          <div className="mb-4 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white hover:bg-blue-600 text-green-500 font-bold text-lg flex gap-3 border-2"
            >
              <FaGoogle className="border-green-500"></FaGoogle>
              <h1 className="text-black">Sign In With Google</h1>
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Login;
