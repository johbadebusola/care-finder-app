import React from "react";
import "../css/Home.css";
import image1 from "../images/image1.svg";
const Home = () => {
  return (
    <div className="Home-cont">
      <div className="box1">
        <h2> Find a hospital within your Location</h2>
        <p>
          Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
        </p>
        <button>Get Started </button>
        <div className="img">
          <img src={image1} alt="image1" />
        
        </div>
      </div>
      
h

    </div>

    
  );
};

export default Home;
