import React from "react";
import styles from "./Resume.module.css";

const Resume = ({ resumeData, isEditing, handleChange }) => {
  return (
    <div className={styles.resumeWrapper}>
      {/* 왼쪽 프로필 정보 */}
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>
          {/* 프로필 이미지 자리 */}
        </div>
        <div className={styles.profileInfo}>
          <p><strong>이름</strong> <br /> {resumeData.name}</p>
          <p><strong>생년월일</strong> <br /> {resumeData.birth}</p>
          <p><strong>이메일</strong> <br /> {resumeData.email}</p>
          <p><strong>연락처</strong> <br /> {resumeData.phone}</p>
          <p><strong>주소</strong> <br /> {resumeData.address}</p>
        </div>
      </div>

      {/* 오른쪽 이력서 상세 정보 */}
      <div className={styles.detailsSection}>
        <div className={styles.section}>
          <h3 className={styles.h3}>학력사항</h3>
          {isEditing ? (
            <input type="text" className={styles.inputField} value={resumeData.education} onChange={(e) => handleChange(e, "education")} />
          ) : (
            <p>{resumeData.education}</p>
          )}
        </div>
        <div className={styles.section}>
          <h3 className={styles.h3}>경력사항</h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index}>
              {isEditing ? (
                <input type="text" className={styles.inputField} value={exp} onChange={(e) => handleChange(e, "experience", index)} />
              ) : (
                <p>{exp}</p>
              )}
            </div>
          ))}
        </div>
        <div className={styles.section}>
          <h3 className={styles.h3}>자격증</h3>
          {resumeData.certificates.map((cert, index) => (
            <div key={index}>
              {isEditing ? (
                <input type="text" className={styles.inputField} value={cert} onChange={(e) => handleChange(e, "certificates", index)} />
              ) : (
                <p>{cert}</p>
              )}
            </div>
          ))}
        </div>
        <div className={styles.section}>
          <h3 className={styles.h3}>자기소개서</h3>
          {isEditing ? (
            <textarea className={styles.textareaField} value={resumeData.selfIntroduction} onChange={(e) => handleChange(e, "selfIntroduction")} />
          ) : (
            <p>{resumeData.selfIntroduction}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
