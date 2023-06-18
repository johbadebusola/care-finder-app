import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../firebase";
import "../../css/Header2.css"
export const Header2 = () => {
  const [toggle, setToggle] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signedout");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <div className="header-cont header2-cont">
        <p>
          Care<span> FINDER</span>
        </p>

        <button className="login-btn  profile-login" onClick={logOut}>
          {" "}
          Log out
        </button>

        <div className={`nav navigation ${toggle ? " " : "active"}`}>
          <ul>
            <li>
              {" "}
              <Link to="/"> Account</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/search"> HospitalList</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/library"> Library</Link>{" "}
            </li>
          </ul>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={` menu1 ${toggle ? " menu1-toggle" : ""}`}> </div>
          <div className={` menu2 ${toggle ? " menu2-toggle" : ""}`}> </div>
          <div className={` menu3 ${toggle ? " menu3-toggle" : ""}`}> </div>
        </div>
      </div>
    </div>
  );
};
