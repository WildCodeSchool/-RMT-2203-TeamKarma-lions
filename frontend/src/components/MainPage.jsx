import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Epic from "../pages/Epic";
import Footer from "./Footer";

export default function MainPage() {
  return (
    <Router>
      <div className="mainpage">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Epic" element={<Epic />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
