import "../css/Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Header = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout, isAuthenticated, user, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };
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
              <Link to="/"> Home </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/search"> HospitalList</Link>{" "}
            </li>
            {isAuthenticated && (
              <li>
                {" "}
                <Link to="users"> Profile </Link>{" "}
              </li>
            )}
          </ul>
        </div>

        <div className="auth-div">
          <div>
            {isLoading ? (
              <div> </div>
            ) : (
              isAuthenticated && (
                <div className="profile-img">
                  <img src={user?.picture} alt={user?.name} />
                </div>
              )
            )}
          </div>
          {!isAuthenticated && (
            <button
              className="login-btn"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              {" "}
              Login{" "}
            </button>
          )}
          {isAuthenticated && (
            <button
              className="login-btn"
              onClick={() => {
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
            >
              {" "}
              Logout
            </button>
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
