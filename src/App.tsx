import "./App.css";
import { Header } from "./Component/Header";
import { Search } from "./Component/Search";
function App() {
  return (
    <div className="App">
     <Header />
     <Search />
    </div>
  );
}

export default App;


// firebase deploy --only hosting:carefiinder