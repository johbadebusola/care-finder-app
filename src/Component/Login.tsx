import { useNavigate } from "react-router";
import "../css/Login.css";
import { useState } from "react";
import { app } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const auth = getAuth(app);
  const signIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        setLoading(false);

        // ...
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
        console.log(errorCode);

        if (errorCode === "auth/network-request-failed") {
          setError("No internet connection");
        }
        if (errorCode === "auth/invalid-email") {
          setError("Invalid Email");
        }
        if (errorCode === "auth/user-not-found") {
          setError("Create an account");
        }
        if (errorCode === "auth/wrong-password") {
          setError("Wrong password");
        }
        if (errorCode === "auth/missing-password") {
          setError("Input password");
        }
      });
  };

  return (
    <>
      <div className="login">
        <div className="box1">
          <h1> Welcome back</h1>
          <p className="p1"> Login using correct details</p>
          <p className="error">{error}</p>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <button onClick={signIn}>{loading ? "Loging in.." : "Log In"}</button>
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

export default Login