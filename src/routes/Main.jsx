import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ResumePage from "../pages/ResumePage"; // 추가

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/resume" element={<ResumePage />} /> 
    </Routes>
  );
};

export default Main;
