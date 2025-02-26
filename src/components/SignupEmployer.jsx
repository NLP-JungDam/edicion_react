import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignupEmployer.module.css";

const SignupEmployer = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        businessNumber: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        passwordConfirm: "",
    });

    // 사업자등록번호 자동 포맷팅 (xxx-xx-xxxxx)
    const formatBusinessNumber = (value) => {
        // 숫자만 남기기
        const numericValue = value.replace(/\D/g, "");

        // xxx-xx-xxxxx 형식 적용
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

        // 사업자 등록번호 입력 시 자동 포맷 적용
        if (name === "businessNumber") {
            value = formatBusinessNumber(value);
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 백엔드로 전송 시 '-' 제거
        const formattedData = {
            businessNumber: form.businessNumber.replace(/-/g, ""), // '-' 제거 후 전송
            name: form.name,
            email: form.email,
            phoneNumber: form.phoneNumber,
            password: form.password,
            passwordConfirm: form.passwordConfirm
        };

        try {
            const response = await fetch("http://localhost:8080/auth/signup/employer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            const data = await response.json();
            console.log(data)
            console.log(formattedData)

            if (response.ok) {
                alert("회원가입 성공!");
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
                <div className={styles.formTitle}>기업 회원가입</div>
                <input 
                    type="text" 
                    name="businessNumber" 
                    placeholder="사업자 등록번호 (xxx-xx-xxxxx)" 
                    value={form.businessNumber}
                    onChange={handleChange} 
                    className={styles.inputField} 
                    maxLength={12} // "-" 포함 최대 12자리 제한
                />
                <input type="text" name="name" placeholder="기업명" onChange={handleChange} className={styles.inputField} />
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
