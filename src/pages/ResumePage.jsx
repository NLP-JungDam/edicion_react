import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Resume from "../components/Resume";
import Modal from "../components/Modal";  // 모달 컴포넌트 가져오기
import styles from "./ResumePage.module.css";

const ResumePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [resumeData, setResumeData] = useState({
    name: "김사과",
    birth: "2000. 01. 01",
    email: "kdt@kdt.com",
    phone: "01012345678",
    address: "서울특별시 강남구",
    education: "한국대학교 졸업",
    experience: ["ABC회사 인턴", "XYZ 스타트업 마케팅"],
    certificates: ["컴퓨터 활용능력 1급", "SQL 개발자"],
    selfIntroduction: "저는 한국에 온 지 5년이 되었어요...",
  });

  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const newData = [...resumeData[field]];
      newData[index] = e.target.value;
      setResumeData({ ...resumeData, [field]: newData });
    } else {
      setResumeData({ ...resumeData, [field]: e.target.value });
    }
  };

  // 저장 버튼 클릭 시 모달 열기
  const handleSave = () => {
    setIsModalOpen(true);
  };

  // 모달에서 확인 버튼 클릭 시 페이지 이동
  const handleConfirmSave = () => {
    setIsModalOpen(false);
    navigate("/user/resume/job");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" className={styles.titleInput} value="입사지원서" readOnly />
        <button className={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "수정 확인" : "수정"}
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          저장
        </button>
      </div>

      <Resume resumeData={resumeData} isEditing={isEditing} handleChange={handleChange} />

      {/* 모달 컴포넌트 사용 */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        message="이력서가 저장되었어요!"
        buttonText="제출하러 가기"
        onConfirm={handleConfirmSave}
      />
    </div>
  );
};

export default ResumePage;
