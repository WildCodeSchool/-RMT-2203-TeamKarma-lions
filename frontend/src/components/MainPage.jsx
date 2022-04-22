import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Epic from "../pages/Epic";
import Footer from "./Footer";

export default function MainPage() {
  return (
    <div className="mainpage">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Epic" element={<Epic />} />
      </Routes>
      <Footer />
    </div>
  );
}
