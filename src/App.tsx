import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Component/Header";
import { Router } from "./Component/Router";
// import { Search } from "./Component/Search";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import { Profile } from "./Component/LoggedInUser/Profile";
import { Account } from "./Component/LoggedInUser/Account";
import { Router2 } from "./Component/LoggedInUser/Router2";

function App() {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const auth = getAuth(app);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    });
  }, []);
  return (
    <div className="App">
       
      {loggedin ? (
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
