import React, { useState } from "react";
import Signup from "../components/Signup";
import styles from "./SignupPage.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? "로그인" : "회원가입"}</h2>
      <Signup isLogin={isLogin} />
      <button
        className={styles.toggleButton}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "회원가입 하러 가기" : "로그인 하러 가기"}
      </button>
    </div>
  );
};

export default AuthPage;
