import React, { useState } from "react";
import ApplicantsList from "../components/ApplicantsList.jsx";
import ResumeDetail from "../components/ResumeDetail.jsx";
import styles from "./ApplicantsPage.module.css";

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const businessNumber = localStorage.getItem("businessNumber");

  const fetchApplicants = async () => {
    if (!businessNumber) {
      console.error("사업자 번호를 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/employer/${businessNumber}/applicants`);
      if (!response.ok) throw new Error("지원자 데이터를 불러오는 데 실패했습니다.");

      const data = await response.json();
      setApplicants(data); // 지원자 목록 업데이트
    } catch (error) {
      console.error("지원자 목록 조회 오류:", error);
    }
  };

  // 페이지가 렌더링되면 fetch 실행
  if (applicants.length === 0) {
    fetchApplicants();
  }

  // 지원자 선택 시 해당 이력서 표시
  const handleViewResume = (resumeData) => {
    setSelectedResume(resumeData);
  };

  return (
    <div className={styles.container}>
      {/* 좌측 지원자 리스트 */}
      <ApplicantsList applicants={applicants} onSelectApplicant={handleViewResume} />

      {/* 우측 이력서 상세 */}
      <ResumeDetail selectedResume={selectedResume} />
    </div>
  );
};

export default ApplicantsPage;
