import React, { useEffect, useState } from "react";
import hospitalLogo from "../images/hospital_icon.svg";
import "../css/Search.css";
import Loader from "./loader";
import { CSVLink, CSVDownload } from "react-csv";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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
                if (a.data.city < b.data.city) {
                  return 1;
                }
                return 0;
              });

        setHospitalData(data);
        setRerenderedDat(data)
        
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsLoading(true);
    getHospitals();
  }, []);



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterHospitalData = rerenderedData.filter(
      (item:any) =>
        item.data.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.data.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    console.log(filterHospitalData);
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
