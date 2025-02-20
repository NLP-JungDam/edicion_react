import React, { useState } from "react";
import styles from "./SignupEmployer.module.css";

const SignupEmployer = () => {
    const [form, setForm] = useState({
        businessNumber: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/signup/employer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                alert("회원가입 성공!");
                console.log("Response:", data);
            } else {
                alert(`회원가입 실패: ${data.message}`);
            }
        } catch (error) {
            console.error("회원가입 요청 오류:", error);
            alert("서버 오류 발생!");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>기업 회원가입</div>
                <input type="text" name="businessNumber" placeholder="사업자 등록번호" onChange={handleChange} className={styles.inputField} />
                <input type="text" name="name" placeholder="회사명" onChange={handleChange} className={styles.inputField} />
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} className={styles.inputField} />
                <input type="text" name="phoneNumber" placeholder="전화번호" onChange={handleChange} className={styles.inputField} />
                <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} className={styles.inputField} />
                <input type="password" name="passwordConfirm" placeholder="비밀번호 확인" onChange={handleChange} className={styles.inputField} />
                <button className={styles.submitButton} onClick={handleSubmit}>회원가입</button>
            </div>
        </div>
    );
};

export default SignupEmployer;
