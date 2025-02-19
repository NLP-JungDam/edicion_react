import React from "react";
import styles from "./ResumePage.module.css";

const ResumePage = () => {
  // 하드코딩된 이력서 데이터
  const resumeData = {
    profileImage: "", // 나중에 이미지 URL 추가
    name: "김사과",
    birth: "2000. 01. 01",
    email: "kdt@kdt.com",
    phone: "01012345678",
    address: "서울특별시 강남구",
    education: "한국대학교 졸업",
    experience: [
      "ABC회사 인턴 (2022.03 ~ 2022.08)",
      "XYZ 스타트업 마케팅 (2023.01 ~ 2023.12)",
    ],
    certificates: ["컴퓨터 활용능력 1급", "SQL 개발자"],
    selfIntroduction:
      "저는 한국에 온 지 5년이 되었어요. 처음에는 말이 서툴러서 힘들었지만, 지금은 한국어로 일상 대화도 할 수 있고, 간단한 문서도 읽을 수 있어요. 고향에서는 농사를 지었고, 손으로 하는 일에 익숙해요. 성실하게 일할 자신 있어요!",
  };

  return (
    <div className={styles.container}>
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
            <h3>학력사항</h3>
            <p>{resumeData.education}</p>
          </div>
          <div className={styles.section}>
            <h3>경력사항</h3>
            {resumeData.experience.map((exp, index) => (
              <p key={index}>{exp}</p>
            ))}
          </div>
          <div className={styles.section}>
            <h3>자격증</h3>
            {resumeData.certificates.map((cert, index) => (
              <p key={index}>{cert}</p>
            ))}
          </div>
          <div className={styles.section}>
            <h3>자기소개서</h3>
            <p>{resumeData.selfIntroduction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
