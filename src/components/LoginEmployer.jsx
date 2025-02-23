import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/LoginPage.module.css";

const LoginEmployer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    businessNumber: "",
    password: "",
  });

  // ✅ 사업자등록번호 자동 포맷팅 (xxx-xx-xxxxx)
  const formatBusinessNumber = (value) => {
    const numericValue = value.replace(/\D/g, ""); // 숫자만 남기기

    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 5) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 5)}-${numericValue.slice(5, 10)}`;
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // ✅ 사업자 등록번호 입력 시 자동 포맷 적용
    if (name === "businessNumber") {
      value = formatBusinessNumber(value);
    }

    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    if (!form.businessNumber || !form.password) {
      alert("사업자번호와 비밀번호를 입력해주세요.");
      return;
    }

    // ✅ 백엔드로 전송 시 '-' 제거
    const formattedData = {
      businessNumber: form.businessNumber.replace(/-/g, ""),
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login/employer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      console.log(data);
      console.log(formattedData);

      if (response.ok) {
        alert("로그인 성공!");
        localStorage.setItem("token", data.token); // ✅ 토큰 저장
        localStorage.setItem("businessNumber", formattedData.businessNumber);
        navigate("/employer"); // ✅ 로그인 후 이동
      } else {
        alert(`로그인 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      alert("서버 오류 발생!");
    }
  };

  const handleSignup = () => navigate("/signup/employer");
  const handleFindId = () => navigate("/find-id/employer");
  const handleFindPw = () => navigate("/find-password/employer");

  return (
    <div className={styles.formContainer}>
      <input
        type="text"
        name="businessNumber"
        placeholder="사업자번호 (xxx-xx-xxxxx)"
        value={form.businessNumber}
        onChange={handleChange}
        className={styles.input}
        maxLength={12} // "-" 포함 최대 12자리 제한
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        className={styles.input}
      />

      <div className={styles.checkboxContainer}>
        <input type="checkbox" id="keepLogin" />
        <label htmlFor="keepLogin">로그인 상태 유지</label>
      </div>

      <button className={styles.loginButton} onClick={handleLogin}>
        기업 회원 로그인
      </button>

      <div className={styles.footerLinks}>
        <button onClick={handleSignup}>회원가입</button>
        <button onClick={handleFindId}>아이디 찾기</button>
        <button onClick={handleFindPw}>비밀번호 찾기</button>
      </div>
    </div>
  );
};

export default LoginEmployer;
