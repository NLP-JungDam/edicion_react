import React, { useState } from "react";
import styles from "./SignupEmployer.module.css";

const SignupEmployer = () => {
    const [form, setForm] = useState({ company: "", email: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>기업 회원가입</div>
                <input type="text" name="company" placeholder="회사명" onChange={handleChange} className={styles.inputField} />
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} className={styles.inputField} />
                <button className={styles.submitButton}>회원가입</button>
            </div>
        </div>
    );
};

export default SignupEmployer;
