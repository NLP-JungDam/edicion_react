import React from "react";
import styles from "./JobList.module.css";

const JobDetail = ({ jobTitle, onClose }) => {
  return (
    <div className={styles.jobDetail}>
      <h3>{jobTitle}</h3>
      <p>회사명: {jobTitle}</p>
      <p>근무지: 서울 ○○구 ○○동</p>
      <p>채용 형태: 정직원</p>
      <p>급여 조건: 월 250만 원 (경력에 따라 협의 가능)</p>
      <p>근무 시간: 주 5일 (월~금) 10:00 ~ 19:00</p>
      <p>연령 제한: 만 26세 이상</p>
      <p>복리후생: 4대 보험, 연차, 식대 지원, 명절 보너스, 직원 할인</p>
    </div>
  );
};

export default JobDetail;
