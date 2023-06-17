import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase";
import { Header2 } from "./Header2";
import { Router2 } from "./Router2";
// type userData = {
//   displayName:string|null,
//   photoURL:string | null
//   email:string
// }

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

 

  console.log(user);
  return (
    <>
      <div>
        {user?.map((item: any) => (
          <div key={item.uid}>
            <p> {item.displayName}</p>
            <p> {item.email} </p>
          </div>
        ))}
      </div>
      <Header2 />
      <Router2 />
    </>
  );
};
