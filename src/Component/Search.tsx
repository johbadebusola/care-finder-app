import React, { useEffect, useState } from "react";
import hospitalLogo from "../images/hospital_icon.svg";
import "../css/Search.css";
import Loader from "./loader";
import { CSVLink, CSVDownload } from "react-csv";
import { collection, getDocs } from "firebase/firestore";
import { app, db } from "../firebase";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  doc,
  updateDoc,
  addDoc
} from "firebase/firestore";


type DataType = {
  address: string | any;
  name: string | any;
  city: string | any;
  id: string | any;
  phone: string | null;
}[];

export const Search = () => {
  const [hospitals, setHospitals] = useState<DataType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rerenderedData, setRerenderedDat] = useState<any>([]);
  const [error, setError] = useState<string>();
  const [hospitalData, setHospitalData] = useState<any>([]);
  const [allData, setAllData] = useState<any>();
  const [user, setUser] = useState<any>();
  const auth = getAuth(app);


  const getHospitals = () => {
    setIsLoading(true);
    const hospital = collection(db, "hospitalList");
    getDocs(hospital)
      .then((response) => {
        setIsLoading(false);
        const hosp = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        const data = hosp.sort((a: any, b: any) => {
          if (a.data.city < b.data.city) {
            return -1;
          }
          if (a.data.city > b.data.city) {
            return 1;
          }
          return 0;
        });

        setHospitalData(data);
        setRerenderedDat(data);
      })
      .catch((error) => console.log(error));
  };


// Fetch user Data


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


const filtered = allData?.filter(
  (items: any) => items.data.userId === user?.uid
);



  const addTolibrary = ( item: any ) => {

const updatingDocs = doc(db, "userSavedData",filtered[0]?.id);
    updateDoc(updatingDocs, {
      hospitalData: arrayUnion({
        address: item.data.name,
        name: item.data.address,
      }),
    })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  
    console.log(item.data.name , item.data.address)
  }

  useEffect(() => {
    setIsLoading(true);
    getHospitals();
    getUserSavedList()

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterHospitalData = rerenderedData.filter(
      (item: any) =>
        item.data.city
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.data.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setHospitalData(filterHospitalData);
  };

  return (
    <>
      <div className="search-box1">
        <img src={hospitalLogo} alt="hospital-logo" />
        <h2> Search for Hospitals in Nigeria</h2>
        <p>Search by Hospital name or Location.</p>
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Enter name of Hospital or Location.... "
          onChange={handleChange}
        />
      </div>

      <CSVLink data={hospitals} filename={"HospitalList.csv"}>
        <button> Export </button>
      </CSVLink>

      {error ? (
        <h2> {error} </h2>
      ) : (
        <div className="product-grid">
          {isLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <div>
              {
                hospitalData.length === 0 ? (
                  <h1 className="no-products-found">
                    {" "}
                    No products are found!{" "}
                  </h1>
                ) : (
                  <>
                    {hospitalData.map((item: any) => (
                      <div key={item.id} className="hospitalList">
                        <div>
                          <h1> {item.data?.name}</h1>
                          <p> {item.data.city.toUpperCase()} </p>
                          {
                            user? (  <button onClick={ () => {
                              addTolibrary(item)
                            }} > Add </button>) : " "
                          }
                         
                        </div>
                        <p> {item.data.address} </p>

                      </div>
                    ))}
                  </>
                )
                //
              }
            </div>
          )}
        </div>
      )}
    </>
  );
};
