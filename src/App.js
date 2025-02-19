import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main"; // 기존 라우터 파일
import ResumePage from "./pages/ResumePage"; // 추가한 이력서 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </Router>
  );
}

export default App;
