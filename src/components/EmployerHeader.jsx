import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmployerHeader.module.css";

const EmployerHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>Edición</div>
      
      <div className={styles.rightSection}>
        <button className={styles.mainButton} onClick={() => navigate("/employer/jobpost")}>공고 등록</button>
        <button className={styles.mainButton} onClick={() => navigate("/employer/mypage")}>마이페이지</button>
      </div>
    </header>
  );
};

export default EmployerHeader;
