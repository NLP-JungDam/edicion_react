import React from "react";
import FindPwUser from "../components/FindPwUser";
import FindPwEmployer from "../components/FindPwEmployer";
import styles from "./FindPwPage.module.css";

const FindPwPage = ({ type }) => {
    return (
      <div className={styles.container}>
        <h2>비밀번호 찾기</h2>
        {type === "user" ? <FindPwUser /> : <FindPwEmployer />}
      </div>
    );
  };
  
  export default FindPwPage;