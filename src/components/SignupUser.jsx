import React, { useState } from "react";
import styles from "./SignupUser.module.css";

const SignupUser = () => {
    const [form, setForm] = useState({ name: "", email: "", age: "", gender: "", phone: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.formTitle}>개인 회원가입</div>
          <input type="text" name="name" placeholder="이름" onChange={handleChange} className={styles.inputField} />
          <input type="email" name="email" placeholder="이메일" onChange={handleChange} className={styles.inputField} />
          <button className={styles.submitButton}>회원가입</button>
        </div>
      </div>
    );
};

export default SignupUser;
