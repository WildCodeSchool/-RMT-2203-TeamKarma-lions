import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Footer from "./Footer";

export default function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
