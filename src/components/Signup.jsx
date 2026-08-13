import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const signupRes = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          password: userDetails.password,
        },
        { withCredentials: true },
      );
      console.log(signupRes);
      if (signupRes?.status === 200) {
        navigate("/login");
      } else {
        setError("Something went wrong, please Sign-up again!!");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong during signup.",
      );
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="card bg-base-300 w-96 my-10 justify-center">
        <div className="card-body">
          <h2 className="card-title justify-center">SIGN UP</h2>
          {error !== "" && <p className="text-red-500">{error}</p>}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                required
                placeholder="First name"
                onChange={(e) => {
                  setError("");
                  setUserDetails((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }));
                }}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="2"
                maxLength="30"
                title="Only letters, numbers or dash"
              />
            </label>
            <div className="validator-hint hidden">Enter valid first name</div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                name="lastName"
                type="text"
                value={userDetails.lastName}
                required
                onChange={(e) => {
                  setError("");
                  setUserDetails((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }));
                }}
                placeholder="Last name"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="2"
                maxLength="30"
                title="Only letters, numbers or dash"
              />
            </label>
            <div className="validator-hint hidden">Enter valid last name</div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                value={userDetails.email}
                onChange={(e) => {
                  setError("");
                  setUserDetails((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </fieldset>
          <fieldset>
            <legend className="fieldset-legend">Password</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                value={userDetails.password}
                onChange={(e) => {
                  setError("");
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => navigate("/login")}
          >
            Existing User? Login Here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
