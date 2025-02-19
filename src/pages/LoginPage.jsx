import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동을 위한 useNavigate 추가
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("user");
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 네비게이트

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");

    if (type === "employer") {
      setActiveTab("employer");
    } else {
      setActiveTab("user");
    }
  }, []);

  const handleTabClick = (type) => {
    setActiveTab(type);
    window.history.replaceState(null, "", `/login?type=${type}`);
  };

  const handleLogin = () => {
    if (activeTab === "user") {
      navigate("/user"); // ✅ 개인 회원 로그인 → `/user` 이동
    } else {
      navigate("/employer"); // ✅ 기업 회원 로그인 → `/employer` 이동
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edición</h1>

      {/* 탭 버튼 */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === "user" ? styles.activeTab : ""}`}
          onClick={() => handleTabClick("user")}
        >
          개인 회원 로그인
        </button>
        <button
          className={`${styles.tab} ${activeTab === "employer" ? styles.activeTab : ""}`}
          onClick={() => handleTabClick("employer")}
        >
          기업 회원 로그인
        </button>
      </div>

      {/* 로그인 폼 */}
      <div className={styles.formContainer}>
        <input type="text" className={styles.input} placeholder="아이디" />
        <input type="password" className={styles.input} placeholder="비밀번호" />
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="keepLogin" />
          <label htmlFor="keepLogin">로그인 상태 유지</label>
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>
          {activeTab === "user" ? "개인 회원 로그인" : "기업 회원 로그인"}
        </button>
      </div>

      {/* 하단 링크 */}
      <div className={styles.footerLinks}>
        <span>회원가입</span> | <span>아이디 찾기</span> | <span>비밀번호 찾기</span>
      </div>
    </div>
  );
};

export default LoginPage;
