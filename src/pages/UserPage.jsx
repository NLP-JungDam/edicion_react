import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./UserfitPage.module.css";

const UserfitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ `UserPage`에서 전달된 데이터 가져오기
  const { responseData, selectedJob } = location.state || {};

  // ✅ 상태 변수 설정
  const [userInput, setUserInput] = useState("입력된 자기소개서가 없습니다.");
  const [recommendedResume, setRecommendedResume] = useState("추천 자기소개서가 없습니다.");
  const [jobScores, setJobScores] = useState({});
  const [activeTab, setActiveTab] = useState("userInput");
  const [showRecommendation, setShowRecommendation] = useState(true); // ✅ 75% 이하인지 확인

  useEffect(() => {
    if (responseData) {
      setUserInput(responseData.lorem || "입력된 자기소개서가 없습니다.");
      setRecommendedResume(responseData.resume || "추천 자기소개서가 없습니다.");
      setJobScores(responseData.total_score || {});

      // ✅ 선택된 직업 점수가 75% 미만이면 추천 자기소개서 및 버튼 숨기기
      const selectedJobScore = responseData.total_score?.[selectedJob] || 0;
      if (selectedJobScore < 75) {
        setShowRecommendation(false);
      }
    }
  }, [responseData, selectedJob]);

  // ✅ 내가 선택한 직업을 제외하고 가장 높은 점수를 받은 직업 1개 찾기
  const filteredScores = { ...jobScores };
  delete filteredScores[selectedJob]; // 내가 선택한 직업 제거

  const topJob = Object.entries(filteredScores)
    .sort((a, b) => b[1] - a[1]) // 점수 내림차순 정렬
    .slice(0, 1) // 상위 1개 선택
    .map(([job]) => job)[0]; // 직업명만 가져오기

  // ✅ 전체 직업 적합도를 100% 기준으로 정규화
  const maxScore = Math.max(...Object.values(jobScores), 100);
  const normalizedScores = Object.keys(jobScores).reduce((acc, job) => {
    acc[job] = (jobScores[job] / maxScore) * 100;
    return acc;
  }, {});

  // ✅ 막대 그래프 색상 동적 설정
  const barColors = Object.keys(normalizedScores).map((job) => {
    if (job === selectedJob) return "rgba(255, 99, 132, 0.8)"; // ✅ 내가 선택한 직업 (핑크)
    if (job === topJob) return "rgba(138, 100, 214, 0.8)"; // ✅ 추천된 직업 (보라색, 1개만)
    return "rgba(200, 200, 200, 0.8)"; // ✅ 기타 (회색)
  });

  // ✅ 이력서 저장 함수
  const handleSaveToDB = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }

      const payload = {
        userId,
        jobObjective: selectedJob,
        lorem: userInput,
        resume: recommendedResume,
      };

      console.log("📌 저장할 데이터:", payload);

      const response = await fetch("http://localhost:8080/api/saveResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      alert("이력서가 성공적으로 저장되었습니다!");
      navigate("/user/resume");
    } catch (error) {
      console.error("❌ 이력서 저장 중 오류 발생:", error);
      alert("이력서 저장에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>직무 적합성 분석 결과</h1>

        {/* ✅ 탭 UI (75% 이상일 때만 보이도록) */}
        {showRecommendation && (
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabButton} ${activeTab === "userInput" ? styles.active : ""}`}
              onClick={() => setActiveTab("userInput")}
            >
              내가 작성한 자기소개서
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "recommended" ? styles.active : ""}`}
              onClick={() => setActiveTab("recommended")}
            >
              추천 자기소개서
            </button>
          </div>
        )}

        {/* ✅ 자기소개서 표시 */}
        <div className={styles.resumeBox}>
          {activeTab === "userInput" ? (
            <>
              <h2 className={styles.resumeTitle}>📄 내가 작성한 자기소개서</h2>
              <p className={styles.resumeContent}>{userInput}</p>
            </>
          ) : (
            showRecommendation && (
              <>
                <h2 className={styles.resumeTitle}>📄 추천 자기소개서</h2>
                <p className={styles.resumeContent}>{recommendedResume}</p>
              </>
            )
          )}
        </div>

        {/* ✅ 직무 적합도 막대 그래프 */}
        <div className={styles.barChartContainer}>
          <h2 className={styles.subTitle}>직무별 적합도 비교</h2>
          <Bar
            data={{
              labels: Object.keys(normalizedScores),
              datasets: [
                {
                  label: "직무 적합도 (%)",
                  data: Object.values(normalizedScores),
                  backgroundColor: barColors,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 20,
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    generateLabels: (chart) => [
                      { text: "당신이 선택한 직업", fillStyle: "rgba(255, 99, 132, 0.8)" },
                      { text: "추천된 직업 (1개)", fillStyle: "rgba(138, 100, 214, 0.8)" },
                      { text: "기타", fillStyle: "rgba(200, 200, 200, 0.8)" },
                    ],
                  },
                },
              },
            }}
          />
        </div>

        {/* ✅ 버튼 (75% 이상일 때만 '이력서 작성하러 가기' 버튼 보이도록) */}
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSecondary} onClick={() => navigate(-1)}>
            다시 작성하기
          </button>
          {showRecommendation && (
            <button className={styles.buttonPrimary} onClick={handleSaveToDB}>
              이력서 작성하러 가기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserfitPage;
