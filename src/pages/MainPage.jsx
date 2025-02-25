import React from "react";
import styles from "./MainPage.module.css";

const MainPage = () => {
  const handleNavigate = (type) => {
    window.location.href = `/login?type=${type}`; // URL 변경
  };

  return (
    <div className={styles.container}>
      {/* 중앙 상단 로고 */}
      <div className={styles.logo}>
        <span className={styles.logoWhite}>Edi</span>
        <span className={styles.logoBlack}>ción</span>
      </div>

      <div className={styles.splitContainer}>
        {/* 개인 회원 섹션 */}
        <div className={styles.leftSection}>
          <div className={styles.overlay}></div>
          <div className={styles.infoBox}>
            <h2>맞춤형 AI 이력서 & 직무 추천</h2>
            <ul>
              <li>✔ 직무 적합도 분석</li>
              <li>✔ AI 자소서 첨삭</li>
              <li>✔ 채용 정보 매칭</li>
            </ul>
            <button className={styles.loginButton} onClick={() => handleNavigate("user")}>
              개인 회원 로그인
            </button>
          </div>
        </div>

        {/* 기업 회원 섹션 */}
        <div className={styles.rightSection}>
          <div className={styles.overlay}></div>
          <div className={styles.infoBox}>
            <h2>AI 기반 스마트 채용 관리</h2>
            <ul>
              <li>✔ 맞춤형 인재 추천</li>
              <li>✔ 이력서 자동 분석</li>
              <li>✔ 지원자 직무 적합성 평가</li>
            </ul>
            <button className={styles.loginButton}  onClick={() => handleNavigate("employer")}>
              기업 회원 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

