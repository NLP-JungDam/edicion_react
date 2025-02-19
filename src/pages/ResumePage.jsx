import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResumePage.module.css";

const ResumePage = () => {
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
    education: "한국대학교 졸업",
    experience: ["ABC회사 인턴 (2022.03 ~ 2022.08)", "XYZ 스타트업 마케팅 (2023.01 ~ 2023.12)"],
    certificates: ["컴퓨터 활용능력 1급", "SQL 개발자"],
    selfIntroduction:
      "저는 한국에 온 지 5년이 되었어요. 처음에는 말이 서툴러서 힘들었지만, 지금은 한국어로 일상 대화도 할 수 있고, 간단한 문서도 읽을 수 있어요. 고향에서는 농사를 지었고, 손으로 하는 일에 익숙해요. 성실하게 일할 자신 있어요!",
  });

  // 입력 값 변경 핸들러
  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      // 배열 요소 수정 (경력사항, 자격증)
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

  // 저장 버튼 클릭 시
  const handleSave = () => {
    const confirmSave = window.confirm("이력서를 저장하시겠습니까?");
    if (confirmSave) {
      navigate("/user/resume/finish");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" className={styles.titleInput} value="입사지원서" readOnly />
        <button className={styles.editButton} onClick={handleEditToggle}>
          {isEditing ? "수정 확인" : "수정"}
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          저장
        </button>
      </div>

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
    </div>
  );
};

export default ResumePage;
