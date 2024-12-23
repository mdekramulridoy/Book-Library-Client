import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import registerAnimation from '../assets/lottie/register.json'



const Register = () => {
  useEffect(() => {
    document.title = "Registration";
  }, []);

  const navigate = useNavigate();
  const { createUser, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value.trim();
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const photo = e.target.photo.value;

    setError("");

    if (!terms) {
      setError("Please accept our terms & conditions.");
      toast.error("You must accept the terms & conditions to proceed.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be 6 characters or longer.");
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      toast.error("Password must meet the required criteria.");
      return;
    }

    if (name.split(" ").length < 2) {
      setError("Please provide both your first and last names.");
      toast.error("Full name must include both first and last names.");
      return;
    }

    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ");

    try {
      await createUser(email, password, firstName, lastName, photo);
      e.target.reset();
      toast.success(`Welcome, ${name}!`);
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content lg:flex-row md:flex-row flex-col">
        {/* here animation */}

        <div className="text-center lg:w-[700px] md:w-[500px] w-[400px] lg:text-left">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>

        {/* here animation */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="text-center pt-5">
          <h1 className="text-5xl font-bold text-black">Register now!</h1>
        </div>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full text-black"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-black" />
                  ) : (
                    <FaEye className="text-black" />
                  )}
                </span>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered text-black"
              />
            </div>

            <div className="form-control flex flex-col items-center space-y-2 md:space-y-0 md:space-x-4">
              <label className="label flex items-center">
                <input name="terms" type="checkbox" className="mr-2" />
                <span className="text-black text-sm">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    terms & conditions
                  </Link>
                </span>
              </label>
              <div className="mt-2 md:mt-0">
                <Link
                  className="font-bold text-red-600 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary bg-black"
                disabled={loading}
              >
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
