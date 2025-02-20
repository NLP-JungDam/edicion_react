import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Resume from "../components/Resume"; // Resume 컴포넌트 추가
import styles from "./ResumeEditPage.module.css";

const ResumeEditPage = () => {
  const navigate = useNavigate();

  // 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);

  // 이력서 데이터 상태 관리
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
      {/* 이력서 컴포넌트 */}
      <Resume resumeData={resumeData} isEditing={isEditing} handleChange={handleChange} />

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
