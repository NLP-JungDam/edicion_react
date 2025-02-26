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

      const processedApplicants = data.data
        .filter(applicant => applicant.user)
        .map(applicant => ({
          ...applicant.user,
          fitness: applicant.fitness
        }));
      setApplicants(processedApplicants);
    } catch (error) {
      console.error("지원자 목록 조회 오류:", error);
    }
  };

  if (applicants.length === 0) {
    fetchApplicants();
  }

  const handleViewResume = (resumeData) => {
    setSelectedResume(resumeData);
  };

  return (
    <div className={styles.container}>
      {/* 좌측 지원자 리스트 */}
      <div className={styles.applicantsPanel}>
        <ApplicantsList applicants={applicants} onSelectApplicant={handleViewResume} />
      </div>

      {/* 우측 이력서 상세 */}
      <div className={styles.resumePanel}>
        <ResumeDetail selectedResume={selectedResume} />
      </div>
    </div>
  );
};

export default ApplicantsPage;
