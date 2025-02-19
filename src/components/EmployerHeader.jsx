import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmployerHeader.module.css";

const EmployerHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {/* 왼쪽 로고 */}
      <div className={styles.logo} onClick={() => navigate("/employer")}>
        <span className={styles.logoBlack}>Edi</span>
        <span className={styles.logoOrange}>ción</span>
      </div>

      {/* 오른쪽 버튼들 */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate("/employer/applicants")}>
          지원 현황
        </button>
        <button className={styles.button} onClick={() => navigate("/employer/recommended")}>
          추천 인재
        </button>
      </div>
    </header>
  );
};

export default EmployerHeader;
