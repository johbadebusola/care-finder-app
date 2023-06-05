import "../css/Header.css";
import { useAuth0 } from "@auth0/auth0-react";
export const Header = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout, isAuthenticated,user,isLoading } = useAuth0();

  return (
    <>
      <div className="header-cont">
        <p>
          Care<span> FINDER</span>
        </p>


      <div className="auth-div">


        <div >
        {isLoading ? (
        <div> </div>
      ) : (
        isAuthenticated && (
          <div className="profile-img" >
            <img src={user?.picture} alt={user?.name} />
    
          </div>
        )
      )}
        </div>
      {!isAuthenticated && (
          <button className="login-btn" onClick={() => loginWithRedirect()}>
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

      
      </div>
    </>
  );
};

// https://dev-d81ozu4dqhpu6c21.us.webtask.run/auth0-authentication-api-debugger
