import { BrowserRouter } from "react-router-dom";
import "./styles/App.scss";
import Navbar from "./components/Navbarbis";
import MainPage from "./components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
