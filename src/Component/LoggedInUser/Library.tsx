import React, { useEffect, useState } from "react";
import "../../css/Library.css";
import { app, db } from "../../firebase";
import {
  arrayRemove,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import trash from "../../images/trash.png";
import { ToastContainer, toast } from "react-toastify";

export const Library = () => {
  const [allData, setAllData] = useState<any>();
  const [user, setUser] = useState<any>();

  const auth = getAuth(app);
  const getUserSavedList = () => {
    const StoredHospitalList = collection(db, "userSavedData");
    onSnapshot(StoredHospitalList, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));

      console.log(Data);
      setAllData(Data);
    });
  };

  const deleteList = (item: any) => {
    const updatingDocs = doc(db, "userSavedData", filtered[0]?.id);
    updateDoc(updatingDocs, {
      hospitalData: arrayRemove(item),
    })
      .then((response) => {
        toast.error("Deleted", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserSavedList();

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const filtered = allData?.filter(
    (items: any) => items.data.userId === user?.uid
  );

  if (filtered) {
    console.log(filtered[0].data?.hospitalData.length)
  }

  return (
    <div className="library-cont">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
      />
      <h1> Library</h1>

      <div>
        {filtered ? (
          <>
            <div>

              {
                filtered ?
                filtered[0].data.hospitalData.length === 0 ?<h4> No added Hospital</h4>  :  " " : <h4> No added Hospital</h4>
              }


              {filtered[0]?.data.hospitalData.map(
                (item: any, index: number) => (
                  <div className="library-grid" key={item.id}>
                    <div>
                      <h4> {item.name} </h4>
                      <p> {item.address}</p>
                    </div>

                    <button
                      onClick={() => {
                        deleteList(item);
                      }}
                    >
                      {" "}
                      <img src={trash} alt="delete" />{" "}
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <h4> No added Hospital</h4>
        )}
      </div>
    </div>
  );
};
