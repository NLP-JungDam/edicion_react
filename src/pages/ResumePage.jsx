import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Resume from "../components/Resume";
import Modal from "../components/Modal";
import styles from "./ResumePage.module.css";

const ResumePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [errors, setErrors] = useState({}); // ✅ 유효성 검사 상태 추가
  const userId = localStorage.getItem("userId");

  // ✅ 유저 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        alert("로그인이 필요합니다.");
        setTimeout(() => navigate("/login"), 0);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/user/${userId}`);
        if (!response.ok) throw new Error("유저 데이터를 불러오는 데 실패했습니다.");
        const data = await response.json();

        // ✅ DB 데이터를 변환하여 저장
        setResumeData({
          name: data.name,
          birth: new Date(data.birth).toISOString().split("T")[0],
          email: data.email,
          phone: data.phone?.number || "",
          address: "",
          education: data.education?.map((edu) => ({
            graduated: edu.graduated || "",
            department: edu.department || "",
          })) || [],
          experience: data.history?.map((hist) => ({
            title: hist.title || "",
            date: hist.date || "",
            content: hist.content || "",
          })) || [],
          certificates: data.license?.map((lic) => ({
            name: lic.name || "",
            date: lic.date ? new Date(lic.date).toISOString().split("T")[0] : "",
          })) || [],
          selfIntroduction: data.resume || "자기소개서를 입력해주세요.",
        });
      } catch (error) {
        console.error("❌ 유저 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

// ✅ 입력값 변경 핸들러
const handleChange = (e, field, index = null, subField = null) => {
  if (!resumeData) return; // ✅ resumeData가 없을 때 방어 코드 추가

  if (index !== null && subField !== null) {
    // ✅ 배열 데이터 (학력, 경력, 자격증) 처리
    const newData = [...resumeData[field]];
    if (!newData[index]) newData[index] = {}; // ✅ undefined 방지
    newData[index][subField] = e.target.value;
    setResumeData({ ...resumeData, [field]: newData });
  } else {
    // ✅ 일반 문자열 필드 처리 (자기소개서 등)
    setResumeData({ ...resumeData, [field]: e.target.value });
  }
};


  // ✅ 필드 추가 핸들러
  const handleAddField = (field, emptyData) => {
    setResumeData({ ...resumeData, [field]: [...resumeData[field], emptyData] });
  };

  // ✅ 필드 삭제 핸들러
  const handleRemoveField = (field, index) => {
    const newData = resumeData[field].filter((_, i) => i !== index);
    setResumeData({ ...resumeData, [field]: newData });
  };

  // ✅ 유효성 검사 함수
  const validateFields = () => {
    const newErrors = {};

    // 학력사항 검사
    resumeData.education.forEach((edu, index) => {
      if (!edu.graduated.trim()) newErrors[`education-${index}-graduated`] = "졸업 여부를 입력해주세요. ex) 와플대학교 4년제 졸업/재학학, 냉동고등학교 졸업업";
      if (!edu.department.trim()) newErrors[`education-${index}-department`] = "학과명을 입력해주세요.";
    });

    // 경력사항 검사
    resumeData.experience.forEach((exp, index) => {
      if (!exp.title.trim()) newErrors[`experience-${index}-title`] = "경력 타이틀을 입력해주세요.";
      if (!exp.date.trim()) newErrors[`experience-${index}-date`] = "경력 일자를 입력해주세요.";
    });

    // 자격증 검사
    resumeData.certificates.forEach((cert, index) => {
      if (!cert.name.trim()) newErrors[`certificates-${index}-name`] = "자격증 이름을 입력해주세요.";
      if (!cert.date.trim()) newErrors[`certificates-${index}-date`] = "자격증 취득 날짜를 입력해주세요.";
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ 수정 확인 버튼 클릭 시 유효성 검사
  const handleEditConfirm = () => {
    if (!validateFields()) {
      alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
      return;
    }
    setIsEditing(false);
  };

// ✅ 저장 버튼 클릭 시 DB 업데이트 (talentedType 분석 추가)
const handleSave = async () => {
  if (!validateFields()) {
    alert("입력되지 않은 항목이 있습니다. 확인해주세요.");
    return;
  }

  try {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    console.log(resumeData.selfIntroduction)

    // ✅ 1. talentedType 분석 요청
    const talentedTypeResponse = await fetch(`http://localhost:5500/user/talentedType`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume: resumeData.selfIntroduction }),
    });

    if (!talentedTypeResponse.ok) throw new Error("talentedType 분석 실패!");

    const talentedTypeData = await talentedTypeResponse.json(); // ✅ 분석된 결과 받기
    console.log("✅ talentedType 분석 결과:", talentedTypeData);

    // ✅ 2. 유저 데이터 업데이트 (talentedType 포함)
    const updatedData = {
      userId,
      name: resumeData.name,
      birth: resumeData.birth,
      email: resumeData.email,
      phone: { number: resumeData.phone, verified: false },
      education: resumeData.education.map((edu) => ({
        graduated: edu.graduated,
        department: edu.department,
      })),
      history: resumeData.experience.map((exp) => ({
        title: exp.title,
        date: exp.date,
        content: exp.content,
      })),
      license: resumeData.certificates.map((cert) => ({
        name: cert.name,
        date: cert.date ? new Date(cert.date).toISOString() : null,
      })),
      resume: resumeData.selfIntroduction,
      talentedType: talentedTypeData.talentedType, // ✅ 분석된 결과 저장
    };

    // ✅ 3. 유저 데이터 백엔드 저장
    const response = await fetch(`http://localhost:8080/user/resume`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "userid": userId,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("이력서 저장 실패!");

    setIsModalOpen(true);
  } catch (error) {
    console.error("❌ 이력서 저장 중 오류 발생:", error);
    alert("이력서를 저장하는 동안 오류가 발생했습니다.");
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input type="text" className={styles.titleInput} value="입사지원서" readOnly />
        <button className={styles.editButton} onClick={isEditing ? handleEditConfirm : () => setIsEditing(true)}>
          {isEditing ? "수정 확인" : "수정"}
        </button>
        <button className={styles.saveButton} onClick={handleSave}>
          저장
        </button>
      </div>

      {resumeData ? (
        <Resume
          resumeData={resumeData}
          isEditing={isEditing}
          handleChange={handleChange}
          handleAddField={handleAddField}
          handleRemoveField={handleRemoveField}
          errors={errors} // ✅ 에러 메시지 전달
        />
      ) : (
        <p className={styles.loadingText}>이력서 데이터를 불러오는 중...</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="이력서가 저장되었어요!"
        buttonText="제출하러 가기"
        onConfirm={() => navigate("/user/job")}
      />
    </div>
  );
};

export default ResumePage;
