import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("user");
  const navigate = useNavigate();

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
    navigate(activeTab === "user" ? "/user" : "/employer");
  };

  const handleSignup = () => {
    navigate(activeTab === "user" ? "/signup/user" : "/signup/employer");
  };

  const handleFindId = () => {
    navigate(activeTab === "user" ? "/find-id/user" :"/find-id/user");
  };

  const handleFindPw = () => {
    navigate(activeTab === "user" ? "/find-password/user" : "/find-password/employer");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edición</h1>

      <div className={styles.tabContainer}>
        <button className={`${styles.tab} ${activeTab === "user" ? styles.activeTab : ""}`} onClick={() => handleTabClick("user")}>
          개인 회원 로그인
        </button>
        <button className={`${styles.tab} ${activeTab === "employer" ? styles.activeTab : ""}`} onClick={() => handleTabClick("employer")}>
          기업 회원 로그인
        </button>
      </div>

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

      <div className={styles.footerLinks}>
        <button onClick={handleSignup}>회원가입</button>
        <button onClick={handleFindId}>아이디 찾기</button>
        <button onClick={handleFindPw}>비밀번호 찾기</button>
      </div>
    </div>
  );
};

export default LoginPage;
