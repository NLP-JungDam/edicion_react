import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginUser from "../components/LoginUser";
import LoginEmployer from "../components/LoginEmployer";
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
    navigate(`/login?type=${type}`);
  };

  return (
    <div className={styles.container}>
      {/* 로고 */}
      <h1 className={styles.title}>
        <span className={styles.logoWhite}>Edi</span>
        <span className={styles.logoYellow}>ción</span>
      </h1>

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

      {/* 로그인 폼 (하얀색 배경) */}
      <div className={styles.formContainer}>
        {activeTab === "user" ? <LoginUser /> : <LoginEmployer />}
      </div>
    </div>
  );
};

export default LoginPage;
