import React, { useState } from "react";
import styles from "./FindPwEmployer.module.css";

const FindPwEmployer = () => {
    const [form, setForm] = useState({ email: "", company: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>고용주 비밀번호 찾기</div>
                <input type="text" name="company" placeholder="이름" onChange={handleChange} className={styles.inputField} />
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} className={styles.inputField} />
                <button className={styles.submitButton}>비밀번호 찾기</button>
            </div>
        </div>
    );
};

export default FindPwEmployer;
