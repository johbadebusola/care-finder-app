import "./App.css";
import { Header } from "./Component/Header";
import { Router } from "./Component/Router";
import { Search } from "./Component/Search";

function App() {
  return (
    <div className="App">
     <Header />
     <Router />
    </div>
  );
}

export default App;


// firebase deploy --only hosting:carefiinder