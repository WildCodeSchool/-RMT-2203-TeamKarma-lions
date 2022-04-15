import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

// import "./styles/reset.css";
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
