import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, db } from "../../firebase";
import "../../css/Header2.css";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import avatar from "../../images/user.png";

export const Header2 = () => {
  const [toggle, setToggle] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [allData, setAllData] = useState<any>();
  const [user, setUser] = useState<any>();
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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const getImage = collection(db, "userSavedData");
    onSnapshot(getImage, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setAllData(Data);
    });
  }, []);

  const filtered = allData?.filter(
    (items: any) => items.data.userId === user?.uid
  );

  return (
    <div>
      <div className=" header2-cont">
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

        {filtered ? (
          filtered[0]?.data.image === "" ? (
            <img src={avatar} alt="avatar" />
          ) : (
            <img src={filtered ? filtered[0]?.data.image : ""} alt="avatar" />
          )
        ) : (
          <img src={avatar} alt="avatar" />
        )}

        <div className="hamburger" onClick={toggleMenu}>
          <div className={` menu1 ${toggle ? " menu1-toggle" : ""}`}> </div>
          <div className={` menu2 ${toggle ? " menu2-toggle" : ""}`}> </div>
          <div className={` menu3 ${toggle ? " menu3-toggle" : ""}`}> </div>
        </div>
      </div>
    </div>
  );
};
