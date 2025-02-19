import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./routes/Main"; 
import User from "./routes/User.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Employer from "./routes/Employer.jsx";
import Footer from "./components/Footer.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/employer/*" element={<Employer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
