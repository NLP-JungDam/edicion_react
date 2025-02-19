import React from "react";
import { Routes, Route } from "react-router-dom";
import FindPwPage from "../pages/FindPwPage";

const FindPw = () => {
  return (
    <Routes>
      <Route path="user" element={<FindPwPage type="user" />} />  
      <Route path="employer" element={<FindPwPage type="employer" />} /> 
    </Routes>
  );
};

export default FindPw;
