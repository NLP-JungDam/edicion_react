import React, { useState } from "react";
import Resume from "../components/Resume"; // 공통 Resume 컴포넌트 불러오기
import styles from "./ApplicantsPage.module.css";

// 임시 지원자 데이터
const applicants = [
  { id: 1, name: "이유진", match: 68, resumeData: {
      profileImage: "", name: "이유진", birth: "1995. 03. 15", email: "yujin@example.com",
      phone: "010-5678-1234", address: "서울특별시 강남구", education: "서울대학교 졸업",
      experience: ["ABC기업 인턴 (2022.01 ~ 2022.06)", "스타트업 마케팅 팀장 (2023.03 ~ 현재)"],
      certificates: ["컴퓨터 활용능력 2급", "TOEIC 900점"], selfIntroduction: "창의적인 마케팅 전문가입니다!"
    }
  },
  { id: 2, name: "이도윤", match: 75, resumeData: {
      profileImage: "", name: "이도윤", birth: "1998. 07. 20", email: "doyoon@example.com",
      phone: "010-7777-8888", address: "서울특별시 서초구", education: "고려대학교 졸업",
      experience: ["AI 스타트업 연구원 (2021.03 ~ 현재)"], certificates: ["정보처리기사"],
      selfIntroduction: "데이터 기반의 문제 해결을 즐기는 개발자입니다!"
    }
  }
];

const ApplicantsPage = () => {
  const [selectedResume, setSelectedResume] = useState(null);

  // 지원자 선택 시 해당 이력서 표시
  const handleViewResume = (resumeData) => {
    setSelectedResume(resumeData);
  };

  return (
    <div className={styles.container}>
      {/* 지원자 리스트 (왼쪽) */}
      <aside className={styles.sidebar}>
        {applicants.map((applicant) => (
          <div key={applicant.id} className={styles.applicantCard}>
            <p className={styles.name}>{applicant.name}</p>
            <p className={styles.match}>적합도: {applicant.match}%</p>
            <button className={styles.viewButton} onClick={() => handleViewResume(applicant.resumeData)}>
              열람
            </button>
          </div>
        ))}
      </aside>

      {/* 선택된 이력서 표시 영역 (오른쪽) */}
      <main className={styles.resumeContainer}>
        {selectedResume ? (
          <Resume resumeData={selectedResume} isEditing={false} handleChange={() => {}} />
        ) : (
          <p className={styles.noSelectionText}>열람할 이력서를 선택해주세요.</p>
        )}
      </main>
    </div>
  );
};

export default ApplicantsPage;
