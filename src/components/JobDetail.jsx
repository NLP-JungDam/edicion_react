import React from "react";
import styles from "./JobDetail.module.css";

const JobDetail = ({ job }) => {
  if (!job) return null;

  return (
    <div className={styles.jobDetail}>
      <h3>{job.title}</h3>
      <dl className={styles.detailList}>
        <div className={styles.detailItem}>
          <dt>회사명:</dt>
          <dd>{job.businessName}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>근무지:</dt>
          <dd>{job.location || "위치 정보 없음"}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>채용 형태:</dt>
          <dd>{job.form || "미정"}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>급여 조건:</dt>
          <dd>{job.payment ? `${job.payment}` : "협의 가능"}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>근무 시간:</dt>
          <dd>{job.workHours || "근무 시간 미정"}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>근무 형태:</dt>
          <dd>{job.form || "협의 후 결정"}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>주요 업무:</dt>
          <dd>{job.mainTasks?.join(", ") || "업무 내용 없음"}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>설명:</dt>
          <dd>{job.content || "내용 없음"}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>이러한 직원을 원해요:</dt>
          <dd>{job.preferred || "우대 조건 없음"}</dd>
        </div>
      </dl>
    </div>
  );
};

export default JobDetail;
