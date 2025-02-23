import React from "react";
import styles from "./ResumeDetail.module.css";

const ResumeDetail = ({ selectedResume }) => {
  return (
    <main className={styles.resumeContainer}>
      {selectedResume ? (
        <div className={styles.resumeWrapper}>
          {/* 기본 프로필 정보 */}
          <div className={styles.profileSection}>
            <div className={styles.profileInfo}>
              <p><strong>이름</strong> <br /> {selectedResume.name}</p>
              <p><strong>생년월일</strong> <br /> {new Date(selectedResume.birth).toLocaleDateString()}</p>
              <p><strong>이메일</strong> <br /> {selectedResume.email}</p>
              <p><strong>연락처</strong> <br /> {selectedResume.phone?.number || "정보 없음"}</p>
              <p><strong>성별</strong> <br /> {selectedResume.gender}</p>
            </div>
          </div>

          {/* 학력 정보 */}
          <div className={styles.detailsSection}>
            <div className={styles.section}>
              <h3 className={styles.h3}>학력사항</h3>
              <p>{selectedResume.education || "정보 없음"}</p>
            </div>

            {/* 경력 사항 */}
            <div className={styles.section}>
              <h3 className={styles.h3}>경력사항</h3>
              {selectedResume.history && selectedResume.history.length > 0 ? (
                selectedResume.history.map((exp, index) => (
                  <p key={index}>
                    <strong>{exp.title}</strong> - {exp.date} <br />
                    {exp.content}
                  </p>
                ))
              ) : (
                <p>경력 없음</p>
              )}
            </div>

            {/* 자격증 */}
            <div className={styles.section}>
              <h3 className={styles.h3}>자격증</h3>
              {selectedResume.license && selectedResume.license.length > 0 ? (
                selectedResume.license.map((cert, index) => (
                  <p key={index}>{cert.name} ({cert.date ? new Date(cert.date).toLocaleDateString() : "날짜 없음"})</p>
                ))
              ) : (
                <p>자격증 없음</p>
              )}
            </div>

            {/* 자기소개서 */}
            <div className={styles.section}>
              <h3 className={styles.h3}>자기소개서</h3>
              <p>{selectedResume.resume || "자기소개서 없음"}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.noSelectionText}>열람할 이력서를 선택해주세요.</p>
      )}
    </main>
  );
};

export default ResumeDetail;
