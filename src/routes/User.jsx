import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHeaders from "../components/UserHeader.jsx";
import UserPage from "../pages/UserPage.jsx";
import ResumePage from "../pages/ResumePage.jsx";
import UserinfoPage from "../pages/UserinfoPage.jsx";

const User = () => {
  return (
    <>
      <UserHeaders />
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/info" element={<UserinfoPage/>} />
      </Routes>
    </>
  );
};

export default User;
