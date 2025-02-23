import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobList.module.css";
import JobDetail from "./JobDetail";
import Modal from "./Modal"

const JobList = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [visibleCount, setVisibleCount] = useState(6);

  // 유저 _id useState 처리
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // 채용 공고 불러오기
  useEffect(() => {
    if (!userId) return;

    const url = `http://localhost:8080/job/${userId}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("서버 통신 에러");
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setDisplayedJobs(data.slice(0, 6)); // 처음 6개만 표시
      })
      .catch((err) => console.error("채용 공고 불러오기 실패:", err));
  }, [userId]);

  // 더보기 버튼 load
  const loadMoreJobs = () => {
    const newVisibleCount = visibleCount + 6;
    setDisplayedJobs(jobs.slice(0, newVisibleCount));
    setVisibleCount(newVisibleCount);
  };

  // 채용 공고 상세 보기 토글
  const toggleJobDetail = (index) => {
      setSelectedJobIndex(selectedJobIndex === index ? null : index);
  };

  // 체크박스 state 변경
  const handleCheckboxChange = (jobName) => {
    setSelectedJobs((prev) =>
      prev.includes(jobName)
        ? prev.filter((name) => name !== jobName)
        : [...prev, jobName]
    );
  };

  const handleSubmit = async () => {
    if (selectedJobs.length === 0) {
      alert("지원할 일자리를 선택하세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/job/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          jobIds: selectedJobs,
        }),
      });

      if (response.ok) {
        setIsModalOpen(true);
      } else {
        console.error("이력서 제출 실패");
      }
    } catch (error) {
      console.error("이력서 제출 중 오류 발생", error);
    }
  };

  return (
    <div className={styles.jobList}>
      <h2>일자리 목록</h2>
      <ul>
        {displayedJobs.map((job, index) => (
          <React.Fragment key={job._id}>
            <li className={styles.jobContainer}>
              <div className={styles.checkboxWrapper}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job._id)}
                    onChange={() => handleCheckboxChange(job._id)}
                  />
                  <span className={styles.customCheckbox}></span>
                </label>
                <span>{job.businessName}</span>
              </div>
              <span onClick={() => toggleJobDetail(index)}>
                {selectedJobIndex === index ? "▲" : "▼"}
              </span>
            </li>
            {selectedJobIndex === index && <JobDetail job={job} />}
          </React.Fragment>
        ))}
      </ul>

      {visibleCount < jobs.length && (
        <button className={styles.loadMoreButton} onClick={loadMoreJobs}>
          더보기
        </button>
      )}

      <button className={styles.submitButton} onClick={handleSubmit}>
        이력서 제출하기
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="이력서가 제출되었어요!"
        buttonText="제출 내역 보러 가기"
        onConfirm={() => navigate("/user/info")}
      />
    </div>
  );
};

export default JobList;
