import React, { useState } from "react";
import { useNavigate } from "react-router";
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fname, setFname] = useState<string>();
  const [lname, setlName] = useState<string>();
  const fullName = fname + " " + lname;
  const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      setLoading(false);
      const user = userCredential.user;
      //   const createdUser = auth.currentUser
      console.log(auth.currentUser);
      updateProfile(user, {
        displayName: fullName,
      }).then(() => {
        setLoading(false);
        console.log("displayNname updated");
        navigate("/login");
      });
      console.log(user);
    } catch (error: any) {
      setLoading(false);
      const errorCode = error.code;
      console.log(errorCode);
      setError(errorCode);
      if (errorCode === "auth/network-request-failed") {
        setError("No internet connection");
      }
      if (errorCode === "auth/invalid-email") {
        setError("Invalid Email");
      }
      if (errorCode === "auth/weak-password") {
        setError("Password is too short");
      }

      if (errorCode === "auth/missing-password") {
        setError("Input Password");
      }
    }
  };
  return (
    <>
      <div className="login">
        <div className="box1">
          <h1> Create an account</h1>

          <p className="error">{error}</p>
          <input
            type="text"
            placeholder="First Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFname(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setlName(e.target.value)
            }
          />
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <button onClick={submit}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
          <p className="p2">
            {" "}
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Sign in!</span>
          </p>
        </div>
        <div className="box2"></div>
      </div>
    </>
  );
};
