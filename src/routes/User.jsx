import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHeaders from "../components/UserHeader.jsx";
import UserPage from "../pages/UserPage.jsx";
import ResumePage from "../pages/ResumePage.jsx";

const User = () => {
  return (
    <>
      <UserHeaders /> {/* 사용자 헤더 추가 */}
      <Routes>
        <Route path="/" element={<UserPage />} /> {/* /user */}
        <Route path="/resume" element={<ResumePage />} /> {/* /user/resume */}
      </Routes>
    </>
  );
};

export default User;
