import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 페이지 이동을 위한 useNavigate 추가
import styles from "./SignupUser.module.css";

const SignupUser = () => {
    const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate 훅 선언

    const [form, setForm] = useState({
        userId: "",
        name: "",
        email: "",
        phoneNumber: "", 
        gender: "",
        year: "",
        month: "",
        day: "",
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

        const formattedData = {
            userId: form.userId,
            name: form.name,
            email: form.email,
            phoneNumber: form.phoneNumber,  
            gender: form.gender,
            birth: `${form.year}-${form.month}-${form.day}`, 
            password: form.password,
            passwordConfirm: form.passwordConfirm
        };

        try {
            const response = await fetch("http://localhost:8080/auth/signup/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("회원가입 성공!");
                console.log("Response:", data);
                
                // ✅ 회원가입 성공 후 로그인 페이지로 이동
                navigate("/login"); 
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
                <div className={styles.formTitle}>개인 회원가입</div>
                <input type="text" name="userId" placeholder="유저 아이디" onChange={handleChange} className={styles.inputField} />
                <input type="text" name="name" placeholder="이름" onChange={handleChange} className={styles.inputField} />
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} className={styles.inputField} />
                <input type="text" name="phoneNumber" placeholder="전화번호" onChange={handleChange} className={styles.inputField} />
                <select name="gender" onChange={handleChange} className={styles.inputField}>
                    <option value="">성별 선택</option>
                    <option value="남">남성</option>  
                    <option value="여">여성</option>  
                </select>
                <div className={styles.birthInputContainer}>
                    <input type="text" name="year" placeholder="년도" onChange={handleChange} className={styles.inputField} />
                    <input type="text" name="month" placeholder="월" onChange={handleChange} className={styles.inputField} />
                    <input type="text" name="day" placeholder="일" onChange={handleChange} className={styles.inputField} />
                </div>
                <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} className={styles.inputField} />
                <input type="password" name="passwordConfirm" placeholder="비밀번호 확인" onChange={handleChange} className={styles.inputField} />
                <button className={styles.submitButton} onClick={handleSubmit}>회원가입</button>
            </div>
        </div>
    );
};

export default SignupUser;
