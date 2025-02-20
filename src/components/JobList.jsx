import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobList.module.css";
import JobDetail from "./JobDetail";
import Modal from "./Modal"

// 더미
const jobs = [
    { name: "서울무역회사" },
    { name: "세림회계법인" },
    { name: "한빛물류" },
    { name: "미래IT솔루션" },
    { name: "푸른HR컨설팅" },
    { name: "디지털커머스 코리아" },
  ];

const JobList = () => {
  const navigate = useNavigate();
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const toggleJobDetail = (index) => {
      setSelectedJobIndex(selectedJobIndex === index ? null : index);
  };

  const handleCheckboxChange = (jobName) => {
    setSelectedJobs((prev) =>
      prev.includes(jobName)
        ? prev.filter((name) => name !== jobName)
        : [...prev, jobName]
    );
  };

  const handleSubmit = () => {
    if (selectedJobs.length === 0) {
      alert("지원할 일자리를 선택하세요.");
      return;
    }

    // 모달 열기
    setIsModalOpen(true);
    // 추후 백엔드 API 연동
    alert(`selectedJobs 확인용: ${selectedJobs.join(", ")}`);
  };

  // 모달에서 확인 버튼 클릭 시 실행되는 함수
  const handleSubmitDetails = () => {
    setIsModalOpen(false);
    navigate("/user/info"); // 제출 내역 페이지로 이동
  };

  return (
    <div className={styles.jobList}>
      <h2>일자리 목록</h2>
      <ul>
        {jobs.map((job, index) => (
          <React.Fragment key={index}>
            <li className={styles.jobContainer}>
              {/* 체크박스 + 회사명을 하나의 수평 정렬 그룹으로 묶음 */}
              <div className={styles.checkboxWrapper}>
                <label>
                  {/* 숨겨진 기본 체크박스 */}
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.name)}
                    onChange={() => handleCheckboxChange(job.name)}
                  />
                  {/* 커스텀 체크박스 */}
                  <span className={styles.customCheckbox}></span>
                </label>
                {/* 회사명 */}
                <span>{job.name}</span>
              </div>
              <span onClick={() => toggleJobDetail(index)}>
                {selectedJobIndex === index ? "▲" : "▼"}
              </span>
            </li>
            {selectedJobIndex === index && <JobDetail jobTitle={job.name} />}
        </React.Fragment>
        ))}
      </ul>
      <button className={styles.submitButton} onClick={handleSubmit}>
        이력서 제출하기
      </button>

      {/* 모달 컴포넌트 사용 */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        message="이력서가 제출되었어요!" 
        buttonText="제출 내역 보러 가기" 
        onConfirm={handleSubmitDetails} 
      />
    </div>
  );
};

export default JobList;
