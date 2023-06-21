import React, { useEffect, useState } from "react";
import "../../css/Library.css";
import { app, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Item from "antd/es/list/Item";

export const Library = () => {
  const [allData, setAllData] = useState<any>();
  const [user, setUser] = useState<any>();
  const [filteredData, setFilteredData] = useState();
  const auth = getAuth(app);
  const getUserSavedList = () => {
    const StoredHospitalList = collection(db, "userSavedData");
    getDocs(StoredHospitalList).then((response) => {
      const fetchedData = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setAllData(fetchedData);
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


  console.log(allData)
  if (filtered) {
    console.log(filtered[0]?.data.hospitalData);
  }

  return (
    <div className="library-cont">
      <h1> Library</h1>

      <div>
        {filtered ? (
          <>
            
            <div>
          {  filtered[0]?.data.hospitalData.map((item:any) => (
            <div className="library-grid"  key={item.id}> 
              <p> {item.name}</p>
              <p> {item.address} </p>
              <button> Del </button>
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
