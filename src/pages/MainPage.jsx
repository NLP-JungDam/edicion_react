import React from "react";
import styles from "./MainPage.module.css";

const MainPage = () => {
  const handleNavigate = (type) => {
    window.location.href = `/login?type=${type}`; // URL 변경
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>대충 사이트 이름</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.loginButton} onClick={() => handleNavigate("user")}>
          개인 회원 로그인
        </button>
        <button className={styles.loginButton} onClick={() => handleNavigate("employer")}>
          기업 회원 로그인
        </button>
      </div>
    </div>
  );
};

export default MainPage;
