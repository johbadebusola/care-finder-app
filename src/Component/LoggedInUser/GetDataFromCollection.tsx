import React, { useEffect, useState } from "react";
import { app, db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";


const GetDataFromCollection = () => {
    const [allData, setAllData] = useState<any>();


  const getData = () => {
    const StoredHospitalList = collection(db, "FeedData");
    onSnapshot(StoredHospitalList, (snapshot) => {
      const Data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      setAllData(Data);
    });
  };

  useEffect(() => {
getData()
  },[])
  
  return allData
};

export default GetDataFromCollection;
