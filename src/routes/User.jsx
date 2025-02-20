import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHeader from "../components/UserHeader.jsx";
import UserfitPage from "../pages/UserfitPage.jsx"
import UserPage from "../pages/UserPage.jsx";
import ResumePage from "../pages/ResumePage.jsx";
import UserinfoPage from "../pages/UserinfoPage.jsx";
import ResumeEditPage from "../pages/ResumeEditPage.jsx";
import UserJobPage from "../pages/UserJobPage.jsx";

const User = () => {
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/fit" element={<UserfitPage />} />
        <Route path="/info" element={<UserinfoPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/job" element={<UserJobPage />} />
        <Route path="/resume/edit" element={<ResumeEditPage />} /> {/* /user/resume/edit */}
      </Routes>
    </>
  );
};

export default User;
