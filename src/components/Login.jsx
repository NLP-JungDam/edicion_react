import React from "react";
import styles from "./Signup.module.css";

const AuthForm = ({ isLogin }) => {
  return (
    <div className={styles.formContainer}>
      <input type="text" placeholder="이메일" className={styles.inputField} />
      <input type="password" placeholder="비밀번호" className={styles.inputField} />
      {!isLogin && (
        <input type="text" placeholder="이름" className={styles.inputField} />
      )}
      <button className={styles.submitButton}>
        {isLogin ? "로그인" : "회원가입"}
      </button>
    </div>
  );
};

export default AuthForm;
