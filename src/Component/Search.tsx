import React, { useEffect, useState } from "react";
import hospitalLogo from "../images/hospital_icon.svg";
import "../css/Search.css";
import Loader from "./loader";

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
  const [rerenderedData, setRerenderedDat] = useState<DataType>([]);
  const [error, setError] = useState<string>();
  // Fetch Hospital list from Api
  async function fetchData() {
    setIsLoading(true);
    const response = await fetch(
      "https://hospital-nigeria-api.hasura.app/api/rest/hospital"
    );
    const result = await response.json();
    setIsLoading(false);
    return result;
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then((result) => {
        // console.log(result.hospitalList);
        setIsLoading(false);
        const data = result.hospitalList.sort((a: any, b: any) => {
          if (a.city < b.city) {
            return -1;
          }
          if (a.city < b.city) {
            return 1;
          }

          return 0;
        });

        setHospitals(data);
        setRerenderedDat(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
        setError("No internet Connection");
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterHospitalData = rerenderedData.filter(
      (item) =>
        item.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    console.log(filterHospitalData);
    setHospitals(filterHospitalData);
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

      {error ? (
        <h2> {error} </h2>
      ) : (
        <div className="product-grid">
          {isLoading ? (
            <div className="loader" >
              <Loader />
            </div>
          ) : (
            <div>
              {
                hospitals.length === 0 ? (
                  <h1 className="no-products-found">
                    {" "}
                    No products are found!{" "}
                  </h1>
                ) : (
                  <>
                    {hospitals.map((item) => (
                      <div key={item.id} className="hospitalList">
                        <div>
                          <h1> {item.name}</h1>
                          <p> {item.city.toUpperCase()} </p>
                        </div>
                        <p> {item.address} </p>
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
