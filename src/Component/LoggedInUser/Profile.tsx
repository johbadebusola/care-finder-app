import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase";
import { Header2 } from "./Header2";
import { Router2 } from "./Router2";

export const Profile = () => {
  const [user, setUser] = useState<any>([]);
  const auth = getAuth(app);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser([user]);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <div className="profile-grid">
        <Header2 />
        <Router2 />
      </div>
    </>
  );
};
