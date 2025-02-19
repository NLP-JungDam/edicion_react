import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployerHeader from "../components/EmployerHeader.jsx";  // ✅ Header는 Routes 밖에 위치
import EmployerPage from "../pages/EmployerPage.jsx";
import JobPostPage from "../pages/JobPostPage.jsx";
import ApplicantsPage from "../pages/ApplicantsPage"; // 지원자 리스트
// import RecommendedPage from "../pages/RecommendedPage"; // 추천 인재 리스트

const Employer = () => {
  return (
    <>
      <EmployerHeader /> {/* 고용주 헤더 추가 */}
      <Routes>
        <Route path="/" element={<EmployerPage />} />
        <Route path="/jobpost" element={<JobPostPage />} />
        <Route path="/applicants" element={<ApplicantsPage />} /> 
      </Routes>
    </>
  );
};

export default Employer;
