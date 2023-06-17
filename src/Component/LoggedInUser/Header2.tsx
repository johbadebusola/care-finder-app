import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../../firebase";

export const Header2 = () => {
  const [toggle, setToggle] = useState(false);
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const auth = getAuth(app);


  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signedout");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <div className="header-cont">
        <p>
          Care<span> FINDER</span>
        </p>

        <button className="login-btn" onClick={logOut}>
          {" "}
          Log out
        </button>

        <div className={`nav ${toggle ? " " : "active"}`}>
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
