import React from "react";
import styles from "./JobDetail.module.css";

const JobDetail = ({ job }) => {
  if (!job) return null; // job 데이터가 없으면 렌더링하지 않음

  return (
    <div className={styles.jobDetail}>
      <h3>{job.title}</h3>
      <p><strong>회사명:</strong> {job.businessName}</p>
      <p><strong>근무지:</strong> {job.location || "위치 정보 없음"}</p>
      <p><strong>채용 형태:</strong> {job.form || "미정"}</p>
      <p><strong>급여 조건:</strong> {job.payment ? `${job.payment}` : "협의 가능"}</p>
      <p><strong>근무 시간:</strong> {job.workHours || "근무 시간 미정"}</p>
      <p><strong>근무 형태:</strong> {job.form || "협의 후 결정"}</p>
      <p><strong>주요 업무:</strong> {job.mainTasks?.join(", ") || "업무 내용 없음"}</p>
      <p><strong>설명:</strong> {job.content}, {job.mainTasks}</p>
      <p><strong>이러한 직원을 원해요:</strong> {job.preferred || "우대 조건 없음"}</p>
    </div>
  );
};

export default JobDetail;
