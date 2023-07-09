import React, { useEffect, useState } from "react";
import "../css/Footer.css";
import { useNavigate } from "react-router";
export const Footer = () => {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rerender]);
  return (
    <>
      <div className="Footer-cont">
        <div>
        <p>
          Care<span>FINDER</span>
        </p>
        <h4>
          CareFinder is a website that helps users in Nigeria to search for list
          of hospitals in their state
        </h4>
        </div>
       
        <div className="links">
          <h3> Links </h3>
          <p
            onClick={() => {
              setRerender(!rerender);
              navigate("/");
            }}
          >
            Home
          </p>
          <p
            onClick={() => {
              setRerender(!rerender);
              navigate("/search");
            }}
          >
            Search
          </p>
          <p
            onClick={() => {
              setRerender(!rerender);
              navigate("/login");
            }}
          >
            Login
          </p>
          <p
            onClick={() => {
              setRerender(!rerender);
              navigate("/signup");
            }}
          >
            Signup
          </p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>No 5 Olafimihan Street Ilasamaja, Lagos</p>
          <p>+2348109104562</p>
          <p>johntoyin97@gmail.com</p>
        </div>
      </div>
    </>
  );
};
