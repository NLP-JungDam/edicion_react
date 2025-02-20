import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployerHeader from "../components/EmployerHeader.jsx";
import EmployerPage from "../pages/EmployerPage.jsx";
import ApplicantsPage from "../pages/ApplicantsPage";
import RecommendedPage from "../pages/RecommendedPage";

const Employer = () => {
  return (
    <>
      <EmployerHeader />
      <Routes>
        <Route path="/" element={<EmployerPage />} />
        <Route path="/applicants" element={<ApplicantsPage />} /> 
        <Route path="/recommended" element={<RecommendedPage />} />
      </Routes>
    </>
  );
};

export default Employer;
