import React, { useEffect, useState } from "react";
import "../css/Home.css";
import image1 from "../images/image1.svg";
import image2 from "../images/image2.svg";
import image3 from "../images/image3.svg";
import exports from "../images/export.svg";
import share from "../images/share.svg";
import search from "../images/search.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [hospitalData, setHospitalData] = useState<any | null>(null);

  const getHospitals = () => {
    const hospital = collection(db, "hospitalList");
    getDocs(hospital)
      .then((response) => {
        const hosp = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setHospitalData(hosp);
      
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHospitals();
  }, []);


  return (
    <div className="Home-cont">
      <div className="box1">
        <div className="grid1">
          <h2> Find a hospital within your Location</h2>
          <p>
            Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
          </p>
          <button>Get Started </button>
        </div>

        <div className="img">
          <img src={image1} alt="image1" />
        </div>
      </div>

      <div className="box2">
        <div className="img1">
          <img  src={image2} alt="image2" />
        </div>
        <div className="img2">
          <img src={image3} alt="image3" />
        </div>

        <div className="grid2">
          <h3>
            {" "}
            Welcome to <span>CareFinder</span>
          </h3>
          <p>
            Carefinder is a platform where users can search for hosiptals in
            their areas, export hospital details for your records and enhance
            your healthcare experience by connecting with others and sharing
            valuable resources.
          </p>
          <button>Our Services</button>
        </div>
      </div>

      <div className="box3">
        <div className="grid1">
          <div className="svg">
            <img src={search} alt="seaerrch" />
          </div>
          <h3>Search Hospitals</h3>
          <p> Effortless Find the Best Doctors Near you </p>
        </div>
        <div className="grid2">
          <div className="svg">
            <img src={share} alt="share" />
          </div>
          <h3>Share Hospitals</h3>
          <p>Share the list of hospitals with others</p>
        </div>
        <div className="grid3">
          <div className="svg">
            <img src={exports} alt="exports" />
          </div>
          <h3> Export Hospitals </h3>
          <p>Save list of hospitals</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
