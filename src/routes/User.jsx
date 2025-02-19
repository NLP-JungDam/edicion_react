import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHeader from "../components/UserHeader.jsx";  // ✅ Header는 Routes 밖에 위치
import UserPage from "../pages/UserPage.jsx";
import ResumePage from "../pages/ResumePage.jsx";
import UserinfoPage from "../pages/UserinfoPage.jsx";

const User = () => {
  return (
    <>
      <UserHeader /> {/* 사용자 헤더 추가 */}
      <Routes>
        <Route path="/" element={<UserPage />} /> {/* /user */}
        <Route path="/resume" element={<ResumePage />} /> {/* /user/resume */}
      </Routes>
    </>
  );
};

export default User;
