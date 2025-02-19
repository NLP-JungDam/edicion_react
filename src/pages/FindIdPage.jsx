import React, { useState } from "react";
import styles from "./FindIdPage.module.css";

const FindId = () => {
    const [form, setForm] = useState({ name: "", phone: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>아이디 찾기</div>
                <input type="text" name="name" placeholder="이름" onChange={handleChange} className={styles.inputField} />
                <input type="text" name="phone" placeholder="전화번호" onChange={handleChange} className={styles.inputField} />
                <button className={styles.submitButton}>아이디 찾기</button>
            </div>
        </div>
    );
};

export default FindId;
