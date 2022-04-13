import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
