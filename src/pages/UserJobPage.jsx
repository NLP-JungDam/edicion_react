import React from "react";
import styles from "./UserJobPage.module.css";
import JobList from "../components/JobList.jsx";

function UserJobPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.introSection}>
        <h1>나의 일자리 지원</h1>
        <p>
          작성하신 자기소개서의 직무 적합도에 해당하는 채용 공고 목록입니다.
          <br />
          원하는 일자리를 둘러보고 관심 있는 공고에 이력서를 제출하세요!
          상세 정보를 보려면 토글 버튼을 눌러주세요.
        </p>
      </div>
      <JobList />
    </div>
  );
}

export default UserJobPage;
