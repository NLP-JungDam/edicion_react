import React from "react";
import SignupUser from "../components/SignupUser";
import SignupEmployer from "../components/SignupEmployer";
import styles from "./SignupPage.module.css";

const SignupPage = ({ type }) => {  // ✅ useParams() 대신 props로 받음
  return (
    <div className={styles.container}>
      {/* <h2>회원가입</h2> */}
      {type === "user" ? <SignupUser /> : <SignupEmployer />}
    </div>
  );
};

export default SignupPage;
