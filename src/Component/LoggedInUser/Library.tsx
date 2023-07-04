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
import { CSVLink } from "react-csv";

import { EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon } from "react-share";

export const Library = () => {
  const [allData, setAllData] = useState<any>();
  const [user, setUser] = useState<any>();

  const auth = getAuth(app);
  const datas: any = [];
  const headers = [
    { label: "NAME", key: "name" },
    { label: "ADDRESS", key: "address" },
  ];

  const getUserSavedList = () => {
    const StoredHospitalList = collection(db, "userSavedData");
    onSnapshot(StoredHospitalList, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
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
      } else {
        setUser(null);
      }
    });
  }, []);

  const filtered = allData?.filter(
    (items: any) => items.data.userId === user?.uid
  );

  if (filtered) {
    for (let item = 0; item < filtered[0]?.data?.hospitalData.length; item++) {
      const data = {
        name: filtered[0].data.hospitalData[item].name,
        address: filtered[0].data.hospitalData[item].address,
      };

      datas.push(data);
    }
  }

  const csvReport = {
    data: datas,
    headers: headers,
    filename: "Hospital-list.csv",
  };

;

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
              {filtered ? (
                filtered[0]?.data.hospitalData.length === 0 ? (
                  <h4> No added Hospital</h4>
                ) : (
                  " "
                )
              ) : (
                <h4> No added Hospital</h4>
              )}

              {filtered[0]?.data.hospitalData.map(
                (item: any, index: number) => (
                  <div className="library-grid" key={index}>
                    <div>
                      <h4> {item.name} </h4>
                      <p> {item.address}</p>
                    </div>

                      <img onClick={() => {
                        deleteList(item);
                      }} src={trash} alt="delete" />{" "}
                  
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <h4> No added Hospital</h4>
        )}
      </div>

      <CSVLink className="export" {...csvReport}>
        <button className="csv-btn">Export saved Hospitals to CSV</button>
      </CSVLink>
      <br />
      <div className="Share">
        <h4>Share List Of Hospitals Via : </h4>
        <div>
        <EmailShareButton 
        className="email"
          subject="List of All Hospitals From CareFinder"
          body={`  This is a Link to view the list of Hospitals in Nigeria
          `
          }  
          url={"https://carefiinder.web.app/search"}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        
        <TwitterShareButton
         url={"https://carefiinder.web.app/search"}
         title="View List of hospitals in Nigeria ono careFinder  "
    
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        </div>
      
      </div>
    </div>
  );
};
