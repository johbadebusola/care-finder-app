import { useNavigate } from "react-router";
import "../css/Login.css";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login">
        <div className="box1">
          <h1> Welcome back</h1>
          <p className="p1"> Login using correct details</p>
          <input type="email" name="email" placeholder="Email Address" />
          <input type="password" name="pass" placeholder="Password" />
          <button> Login </button>
          <p className="p2">
            Already have an account?{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup!
            </span>
          </p>
        </div>
        <div className="box2"></div>
      </div>
    </>
  );
};
