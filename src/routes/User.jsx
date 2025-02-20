import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHeader from "../components/UserHeader.jsx";  // ✅ Header는 Routes 밖에 위치
import UserfitPage from "../pages/UserfitPage.jsx"
import UserPage from "../pages/UserPage.jsx";
import ResumePage from "../pages/ResumePage.jsx";
import UserinfoPage from "../pages/UserinfoPage.jsx";
import ResumeEditPage from "../pages/ResumeEditPage.jsx";

const User = () => {
  return (
    <>
      <UserHeader /> {/* 사용자 헤더 추가 */}
      <Routes>
        <Route path="/" element={<UserPage />} /> {/* /user */}
        <Route path="/fit" element={<UserfitPage />} /> {/* /user */}
        <Route path="/info" element={<UserinfoPage />} /> {/* /user */}
        <Route path="/resume" element={<ResumePage />} /> {/* /user/resume */}
        <Route path="/resume/edit" element={<ResumeEditPage />} /> {/* /user/resume/edit */}
      </Routes>
    </>
  );
};

export default User;
