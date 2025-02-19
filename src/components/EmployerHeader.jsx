// Header
import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmployerHeader.module.css";

const EmployerHeader = () => {
  return (
    <header className={styles.header}>
      {/* 왼쪽 로고 */}
      <Link to="/employer" className={styles.logo}>
        <span className={styles.logoBlack}>Edi</span>
        <span className={styles.logoOrange}>ción</span>
      </Link>

      {/* 오른쪽 버튼들 */}
      <div className={styles.buttonContainer}>
        <Link to="/employer/applicants" className={styles.button}>
          지원 현황
        </Link>
        <Link to="/employer/recommended" className={styles.button}>
          추천 인재
        </Link>
      </div>
    </header>
  );
};

export default EmployerHeader;
