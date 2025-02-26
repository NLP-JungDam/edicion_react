import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/LoginPage.module.css";

const LoginUser = () => {
  const navigate = useNavigate();

  // 로그인 폼 상태 관리
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 로그인 요청
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공!");
        console.log("Response:", data);

        // 토큰 및 사용자 정보 저장
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("username", data.username);

        // 로그인 성공 후 페이지 이동
        navigate("/user");
      } else {
        // 실패 시 alert 메시지 표시
        alert(`로그인 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      alert("서버 오류 발생! 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <input
        type="email"
        name="email"
        className={styles.input}
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        className={styles.input}
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
      />

      <button className={styles.loginButton} onClick={handleLogin}>
        개인 회원 로그인
      </button>

      <div className={styles.footerLinks}>
        <button onClick={() => navigate("/signup/user")}>회원가입</button>
        <button onClick={() => navigate("/find-id/user")}>아이디 찾기</button>
        <button onClick={() => navigate("/find-password/user")}>비밀번호 찾기</button>
      </div>
    </div>
  );
};

export default LoginUser;
