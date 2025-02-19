import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main"; // 기존 라우터 파일
import User from "./routes/User.jsx";
import Employer from "./routes/Employer.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/employer/*" element={<Employer />} />
      </Routes>
    </Router>
  );
}

export default App;
