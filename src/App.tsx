import { lazy, useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Component/Header";
import { Router } from "./Component/Router";
import { Helmet } from "react-helmet";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import { Profile } from "./Component/LoggedInUser/Profile";
import { Footer } from "./Component/Footer";

const Login = lazy(() => import("./Component/Login"));

function App() {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const auth = getAuth(app);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
        localStorage.setItem("user", "true");
      } else {
        localStorage.removeItem("user");
        setLoggedin(false);
      }
    });
  }, []);

  const userLocal = JSON.parse(
    typeof localStorage["user"] == "undefined" ? null : localStorage["user"]
  );

  return (
    <>
      <div className="App">
        <Helmet>
          <title>Hospitals in Nigeria | Care Finder</title>
          <meta
            name="description"
            content="A website that hepls to search for hospitals around Nigeria. you can add hospitals to a library and also export to csv"
          />
          <meta
            name="keywords"
            content="Hospital, Hospial list, Export hospitals to csv"
          />
        </Helmet>
        {userLocal ? (
          <div>
            <Profile />
          </div>
        ) : (
          <div>
            <Header />
            <Router />
            <Footer />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

// firebase deploy --only hosting:carefiinder
