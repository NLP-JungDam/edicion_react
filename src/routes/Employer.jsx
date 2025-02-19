import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployerHeader from "../components/EmployerHeader"; // 고용주 헤더 추가
import ApplicantsPage from "../pages/ApplicantsPage"; // 지원자 리스트
// import RecommendedPage from "../pages/RecommendedPage"; // 추천 인재 리스트

const Employer = () => {
  return (
    <>
      <EmployerHeader /> {/* 고용주 헤더 추가 */}
      <Routes>
        <Route path="/applicants" element={<ApplicantsPage />} /> 
        {/* <Route path="/recommended" element={<RecommendedPage />} /> /employer/recommended */}
      </Routes>
    </>
  );
};

export default Employer;
