import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResumeEditPage.module.css";

const ResumeEditPage = () => {
  const navigate = useNavigate();

  // 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);

  // 이력서 데이터 상태 관리 (임시 데이터)
  const [resumeData, setResumeData] = useState({
    profileImage: "", // 나중에 이미지 URL 추가
    name: "김사과",
    birth: "2000. 01. 01",
    email: "kdt@kdt.com",
    phone: "01012345678",
    address: "서울특별시 강남구",
    education: "서울대학교 졸업",
    experience: ["ABC기업 인턴 (2022.01 ~ 2022.06)", "스타트업 마케팅 팀장 (2023.03 ~ 현재)"],
    certificates: ["컴퓨터 활용능력 2급", "TOEIC 900점"],
    selfIntroduction: "창의적인 마케팅 전문가입니다!",
  });

  // 입력 값 변경 핸들러
  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const newData = [...resumeData[field]];
      newData[index] = e.target.value;
      setResumeData({ ...resumeData, [field]: newData });
    } else {
      setResumeData({ ...resumeData, [field]: e.target.value });
    }
  };

  // 수정 버튼 클릭 시
  const handleEditToggle = () => {
    if (isEditing) {
      const confirmEdit = window.confirm("전부 다 수정하셨습니까?");
      if (!confirmEdit) return;
    }
    setIsEditing(!isEditing);
  };

  // 제출하러 가기 버튼 클릭 시
  const handleSubmit = () => {
    navigate("/user/resume/job");
  };

  return (
    <div className={styles.container}>
      {/* 이력서 박스 */}
      <div className={styles.resumeWrapper}>
        {/* 왼쪽 프로필 정보 */}
        <div className={styles.profileSection}>
          <div className={styles.profileImage}></div>
          <div className={styles.profileInfo}>
            <p><strong>이름</strong><br /> {resumeData.name}</p>
            <p><strong>생년월일</strong><br /> {resumeData.birth}</p>
            <p><strong>이메일</strong><br /> {resumeData.email}</p>
            <p><strong>연락처</strong><br /> {resumeData.phone}</p>
            <p><strong>주소</strong><br /> {resumeData.address}</p>
          </div>
        </div>

        {/* 오른쪽 이력서 정보 */}
        <div className={styles.detailsSection}>
          <div className={styles.resumeSection}>
            <h3>학력사항</h3>
            {isEditing ? (
              <input type="text" className={styles.inputField} value={resumeData.education} onChange={(e) => handleChange(e, "education")} />
            ) : (
              <p>{resumeData.education}</p>
            )}
          </div>
          <div className={styles.resumeSection}>
            <h3>경력사항</h3>
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
          <div className={styles.resumeSection}>
            <h3>자격증</h3>
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
          <div className={styles.resumeSection}>
            <h3>자기소개서</h3>
            {isEditing ? (
              <textarea className={styles.textareaField} value={resumeData.selfIntroduction} onChange={(e) => handleChange(e, "selfIntroduction")} />
            ) : (
              <p>{resumeData.selfIntroduction}</p>
            )}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className={styles.buttonContainer}>
        <button className={styles.editButton} onClick={handleEditToggle}>
          {isEditing ? "수정 확인" : "수정"}
        </button>
        <button className={styles.submitButton} onClick={handleSubmit}>
          제출하러 가기
        </button>
      </div>
    </div>
  );
};

export default ResumeEditPage;
