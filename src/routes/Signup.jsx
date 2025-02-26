import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../pages/SignupPage";

const Signup = () => {
  return (
    <Routes>
      <Route path="user" element={<SignupPage type="user" />} /> {/* type을 props로 전달 */}
      <Route path="employer" element={<SignupPage type="employer" />} />
    </Routes>
  );
};

export default Signup;