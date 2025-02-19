import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import User from "./routes/User";
import Login from "./routes/Login";
import Employer from "./routes/Employer";
import Signup from "./routes/Signup";
import FindId from "./routes/FindId";
import FindPw from "./routes/FindPw";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/employer/*" element={<Employer />} />
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/find-id/*" element={<FindId />} />
        <Route path="/find-password/*" element={<FindPw/>} />
      </Routes>
    </Router>
  );
}

export default App;
