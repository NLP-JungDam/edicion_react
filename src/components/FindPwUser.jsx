import React, { useState } from "react";
import styles from "./FindPwUser.module.css";

const FindPwUser = () => {
    const [form, setForm] = useState({ email: "", phone: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>개인 비밀번호 찾기</div>
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} className={styles.inputField} />
                <input type="text" name="phone" placeholder="전화번호" onChange={handleChange} className={styles.inputField} />
                <button className={styles.submitButton}>비밀번호 찾기</button>
            </div>
        </div>
    );
};

export default FindPwUser;
