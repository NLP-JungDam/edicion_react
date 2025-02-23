import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./UserfitPage.module.css";

const UserfitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ `UserPage`에서 전달된 데이터 가져오기
  const { responseData, selectedJob } = location.state || {}; // ✅ selectedJob을 받아오기

  // ✅ 상태 변수 설정
  const [suitability, setSuitability] = useState(0);
  const [userInput, setUserInput] = useState("입력된 자기소개서가 없습니다.");
  const [recommendedResume, setRecommendedResume] = useState("추천 자기소개서가 없습니다.");
  const [jobScores, setJobScores] = useState({});
  const [activeTab, setActiveTab] = useState("userInput"); // ✅ 탭 상태 추가

  useEffect(() => {
    if (responseData) {
      setSuitability(responseData.total_score?.[selectedJob] || 0);
      setUserInput(responseData.lorem || "입력된 자기소개서가 없습니다.");
      setRecommendedResume(responseData.resume || "추천 자기소개서가 없습니다.");
      setJobScores(responseData.total_score || {}); // 전체 직무 적합도 저장
    }
  }, [responseData, selectedJob]);

  // ✅ 가장 높은 점수를 받은 직업 찾기
  const highestScoredJob = Object.entries(jobScores).reduce(
    (max, [job, score]) => (score > max.score ? { job, score } : max),
    { job: null, score: 0 }
  ).job;

  // ✅ 막대 그래프 색상 동적 설정
  const barColors = Object.keys(jobScores).map((job) => {
    if (job === selectedJob) return "rgba(255, 99, 132, 0.8)"; // ✅ 사용자가 선택한 직업 (핑크)
    if (job === highestScoredJob) return "rgba(138, 100, 214, 0.8)"; // ✅ 추천된 직업 (보라색)
    return "rgba(200, 200, 200, 0.8)"; // ✅ 기타 (회색)
  });

  // ✅ 이력서 저장 함수 (DB에 저장)
  const handleSaveToDB = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }

      const payload = {
        userId,
        jobObjective: selectedJob, // ✅ 필드명 jobObjective로 변경
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
      navigate("/user/resume"); // 저장 후 이동
    } catch (error) {
      console.error("❌ 이력서 저장 중 오류 발생:", error);
      alert("이력서 저장에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>직무 적합성 분석 결과</h1>

        {/* ✅ 탭 UI */}
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

        {/* ✅ 탭에 따른 내용 표시 */}
        <div className={styles.resumeBox}>
          {activeTab === "userInput" ? (
            <>
              <h2 className={styles.resumeTitle}>📄 내가 작성한 자기소개서</h2>
              <p className={styles.resumeContent}>{userInput}</p>
            </>
          ) : (
            <>
              <h2 className={styles.resumeTitle}>📄 추천 자기소개서</h2>
              <p className={styles.resumeContent}>{recommendedResume}</p>
            </>
          )}
        </div>

        {/* ✅ 전체 직무 적합도 막대 그래프 */}
        <div className={styles.barChartContainer}>
          <h2 className={styles.subTitle}>직무별 적합도 비교</h2>
          <Bar
            data={{
              labels: Object.keys(jobScores),
              datasets: [
                {
                  label: "직무 적합도 (%)",
                  data: Object.values(jobScores),
                  backgroundColor: barColors, // ✅ 동적 색상 적용
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    generateLabels: (chart) => {
                      const labels = [
                        { text: "당신이 선택한 직업", fillStyle: "rgba(255, 99, 132, 0.8)" },
                        { text: "추천된 직업 (가장 높은 점수)", fillStyle: "rgba(138, 100, 214, 0.8)" },
                        { text: "기타", fillStyle: "rgba(200, 200, 200, 0.8)" },
                      ];
                      return labels;
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* ✅ 버튼 */}
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSecondary} onClick={() => navigate(-1)}>
            다시 작성하기
          </button>
          <button className={styles.buttonPrimary} onClick={handleSaveToDB}>
            이력서 작성하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserfitPage;
