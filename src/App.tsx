import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Component/Header";
import { Router } from "./Component/Router";
// import { Search } from "./Component/Search";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import { Profile } from "./Component/LoggedInUser/Profile";
import { json } from "stream/consumers";

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
    <div className="App">
      {userLocal ? (
        <div>
          <Profile />
        </div>
      ) : (
        <div>
          <Header />
          <Router />
        </div>
      )}
    </div>
  );
}

export default App;

// firebase deploy --only hosting:carefiinder
