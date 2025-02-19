import React from "react";
import styles from "./ApplicantsPage.module.css";

const ApplicantsPage = () => {
  // 임시 지원자 데이터
  const applicants = [
    { id: 1, name: "이유진", match: 68, resumeLink: "#" },
    { id: 2, name: "이도윤", match: 75, resumeLink: "#" },
    { id: 3, name: "이지안", match: 80, resumeLink: "#" },
  ];

  return (
    <div className={styles.container}>
      {/* 지원자 리스트 */}
      <aside className={styles.sidebar}>
        {applicants.map((applicant) => (
          <div key={applicant.id} className={styles.applicantCard}>
            <p className={styles.name}>{applicant.name}</p>
            <p className={styles.match}>적합도: {applicant.match}%</p>
            <button className={styles.viewButton}>열람</button>
          </div>
        ))}
      </aside>

      {/* 지원자 이력서 영역 (임시 박스) */}
      <main className={styles.resumeContainer}>
        <h2>이력서 미리보기</h2>
        <div className={styles.resumeBox}>
          <p>지원자의 이력서가 여기에 표시됩니다.</p>
        </div>
      </main>
    </div>
  );
};

export default ApplicantsPage;
