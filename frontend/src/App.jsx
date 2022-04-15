import { BrowserRouter } from "react-router-dom";
// import "./styles/reset.css";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";


import "./styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
