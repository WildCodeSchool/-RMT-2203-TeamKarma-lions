import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Epic from "../pages/Epic";
import Curiosity from "../pages/Curiosity";
import NaturalEvents from "../pages/NaturalEvents";
import Footer from "./Footer";

export default function MainPage() {
  return (
    <div className="mainpage">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Epic" element={<Epic />} />
        <Route path="/Curiosity" element={<Curiosity />} />
        <Route path="/NaturalEvents" element={<NaturalEvents />} />
      </Routes>
      <Footer />
    </div>
  );
}
