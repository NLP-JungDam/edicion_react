import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployerHeader from "../components/EmployerHeader.jsx";  // ✅ Header는 Routes 밖에 위치
import EmployerPage from "../pages/EmployerPage.jsx";
import JobPostPage from "../pages/JobPostPage.jsx";

const Employer = () => {
  return (
    <div>
      <EmployerHeader /> {/* ✅ 항상 보이는 Header */}
      <Routes>
        <Route path="/" element={<EmployerPage />} />
        <Route path="/jobpost" element={<JobPostPage />} />
      </Routes>
    </div>
  );
};

export default Employer;
