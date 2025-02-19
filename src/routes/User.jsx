import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHeaders from "../components/UserHeader.jsx";
import UserPage from "../pages/UserPage.jsx";
import ResumePage from "../pages/ResumePage.jsx";

const User = () => {
  return (
    <Routes>
      <UserHeaders />
      <Route path="/" element={<UserPage />} />
      <Route path="/resume" element={<ResumePage />} />
    </Routes>
  );
};

export default User;
