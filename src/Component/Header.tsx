import { getAuth,signOut } from "firebase/auth";
import "../css/Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { app } from "../firebase";



export const Header = () => {

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const auth = getAuth(app);
  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      console.log("signedout")
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    });
  },[])

  return (
    <>
      <div className="header-cont">
        <p>
          Care<span> FINDER</span>
        </p>

        <div className={`nav ${toggle ? " " : "active"}`}>
          <ul>
            <li>
              {" "}
              <Link onClick={() => {
              setToggle(false)
            }} to="/"> Home </Link>{" "}
            </li>
            <li>
              {" "}
              <Link onClick={() => {
              setToggle(false)
            }} to="/search"> HospitalList</Link>{" "}
            </li>
          </ul>
        </div>

        <div className="auth-div">
        { !loggedin ? (
            <div>
              <button
                className="login-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >Log in</button>
            </div>
          ) : (
            <div>
              <button className="login-btn" onClick={logOut}> Log out</button>
            </div>
          )}

        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className={` menu1 ${toggle ? " menu1-toggle" : ""}`}> </div>
          <div className={` menu2 ${toggle ? " menu2-toggle" : ""}`}> </div>
          <div className={` menu3 ${toggle ? " menu3-toggle" : ""}`}> </div>
        </div>
      </div>
    </>
  );
};

// https://dev-d81ozu4dqhpu6c21.us.webtask.run/auth0-authentication-api-debugger
