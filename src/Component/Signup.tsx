import React from "react";
import { useNavigate } from "react-router";
export const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login">
        <div className="box1">
          <h1> Create An Account</h1>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email"  placeholder="Email Address" />
          <input type="email"  placeholder="Email Address" />
          <input type="password"  placeholder="Password" />
          <button>Sign up </button>
          <p className="p2">
            {" "}
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Signup!</span>
          </p>
        </div>
        <div className="box2"></div>
      </div>
    </>
  );
};
