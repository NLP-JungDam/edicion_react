import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHeader from "../components/UserHeader.jsx";  // ✅ Header는 Routes 밖에 위치
import UserPage from "../pages/UserPage.jsx";
import ResumePage from "../pages/ResumePage.jsx";
import UserinfoPage from "../pages/UserinfoPage.jsx";

const User = () => {
  return (
    <div>
      <UserHeader /> {/* ✅ 항상 보이는 Header */}
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </div>
  );
};

export default User;
