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
  const [loading, setLoading] = useState(false);

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

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleSubmit = async () => {
    if (selectedJobs.length === 0) {
      alert("지원할 일자리를 선택하세요.");
      return;
    }

    try {
      console.log("디버깅 1")

      // 유저 정보 불러오기(lorem, preferred)
      const userResponse = await fetch(`http://localhost:8080/job/info/${userId}`);

      if(!userResponse) {
        console.error("lorem 불러오기 실패");
        return;
      }

      const userInfo = await userResponse.json();
      const { lorem } = userInfo
      console.log("사용자 lorem", lorem);

      // { job._id : preferred } 형태로 바꾸기
      const jobPreferredMap = {};
      selectedJobs.forEach((jobId) => {
        const job = jobs.find((job) => job._id === jobId);
        if (job) {
          jobPreferredMap[jobId] = job.preferred || null;
        }
      });

      console.log("Job Preferred 변환 값 확인", jobPreferredMap);

      // similarity 모델 호출
      const fastApiRequestBody = {
        lorem,
        jobs: jobPreferredMap
      };
      setLoading(true);

      const similarityResponse = await fetch("http://127.0.0.1:5500/employer/similarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fastApiRequestBody)
      });

      if(!similarityResponse.ok) {
        console.error("FastAPI 호출 실패");
        setLoading(false);
        return;
      }

      const similarityData = await similarityResponse.json();
      console.log("모델 res 값", similarityData);
      console.log("📌 Chroma 유사도:", similarityData.chroma_scores);
      console.log("📌 GPT 유사도:", similarityData.gpt_scores);
      console.log("📌 최종 점수:", similarityData.final_scores);

      const applicantsData = Object.keys(similarityData).map((jobId) => ({
        jobId,
        applicants: { userId, fitness: similarityData[jobId] },
      }));

      console.log("뭔 값?", applicantsData);

      // 이력서 제출 API
      const applyResponse = await fetch("http://localhost:8080/job/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          applicantsData,
        }),
      });

      if (!applyResponse.ok) {
        console.error("이력서 제출 실패");
        return;
      }

      console.log("이력서 제출 성공")
        setLoading(false);
        setIsModalOpen(true);
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

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>이력서 제출 중입니다! 잠시만 기다려 주세요.</p>
        </div>
      )}

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
