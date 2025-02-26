import React from "react";
import styles from "./ApplicantsList.module.css";

const ApplicantsList = ({ applicants, onSelectApplicant }) => {
  return (
    <aside className={styles.sidebar}>
      {applicants.length > 0 ? (
        applicants.map((applicant) => (
          <div key={applicant.id} className={styles.applicantCard}>
            <div className={styles.leftSection}>
              <div className={styles.titleBox}>
                <span className={styles.name}>{applicant.name}</span>
                <span className={styles.gender}>{applicant.gender}</span>
              </div>

              <p className={styles.info}>
                자격증:{" "}
                {applicant.license?.length > 0
                  ? applicant.license.map((cert) => cert.name).join(", ")
                  : "없음"}
              </p>
              <p className={styles.info}>
                경력:{" "}
                {applicant.history?.length > 0
                  ? applicant.history.map((exp) => `${exp.title}`).join(", ")
                  : "없음"}
              </p>
            </div>

            <div className={styles.rightSection}>
              <p className={styles.fitness}>
                적합도: {applicant.fitness}
              </p>
              <button
                className={styles.viewButton}
                onClick={() => onSelectApplicant(applicant)}
              >
                열람
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noApplicants}>지원자가 없습니다.</p>
      )}
    </aside>
  );
};

export default ApplicantsList;
