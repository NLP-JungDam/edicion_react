import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./UserfitPage.module.css";

const UserfitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { responseData, selectedJob } = location.state || {};

  const [userInput, setUserInput] = useState("입력된 자기소개서가 없습니다.");
  const [recommendedResume, setRecommendedResume] = useState("추천 자기소개서가 없습니다.");
  const [jobScores, setJobScores] = useState({});
  const [activeTab, setActiveTab] = useState("userInput");
  const [showRecommendation, setShowRecommendation] = useState(true);
  const [lowestJobStudy, setLowestJobStudy] = useState("");

  useEffect(() => {
    if (responseData) {
      setUserInput(responseData.lorem || "입력된 자기소개서가 없습니다.");
      setRecommendedResume(responseData.resume || "추천 자기소개서가 없습니다.");
      setJobScores(responseData.total_score || {});

      const selectedJobScore = responseData.total_score?.[selectedJob] || 0;
      if (selectedJobScore < 75) {
        setShowRecommendation(false);
        setLowestJobStudy(responseData.study || "추천 학습 방법이 제공되지 않았습니다.");
      }
    }
  }, [responseData, selectedJob]);

  const filteredScores = { ...jobScores };
  delete filteredScores[selectedJob];

  const topJob = Object.entries(filteredScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1)
    .map(([job]) => job)[0];

  const maxScore = Math.max(...Object.values(jobScores), 100);
  const normalizedScores = Object.keys(jobScores).reduce((acc, job) => {
    acc[job] = (jobScores[job] / maxScore) * 100;
    return acc;
  }, {});

  const barColors = Object.keys(normalizedScores).map((job) =>
    job === selectedJob
      ? "rgba(255, 99, 132, 0.8)"
      : job === topJob
      ? "rgba(138, 100, 214, 0.8)"
      : "rgba(200, 200, 200, 0.8)"
  );

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

        {!showRecommendation && (
          <div className={styles.studyContainer}>
            <h2 className={styles.warningTitle}>📉 선택한 직업의 적합도가 낮습니다.</h2>
            <p className={styles.warningText}>
              선택한 "{selectedJob}" 직업의 적합도가 낮습니다. 아래의 학습 방법을 참고하여 개선해 보세요.
            </p>
            <div className={styles.studyBox}>
              <h3 className={styles.studyTitle}>🔍 추천 학습 방법</h3>
              <ReactMarkdown components={{ p: ({ node, ...props }) => <p className={styles.studyContent} {...props} /> }}>
                {lowestJobStudy}
              </ReactMarkdown>
            </div>
          </div>
        )}

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
            }}
          />
        </div>

        {showRecommendation && (
          <div className={styles.resumeBox}>
            <div className={styles.tabContainer}>
              <button
                className={`${styles.tabButton} ${activeTab === "userInput" ? styles.active : ""}`}
                onClick={() => setActiveTab("userInput")}
              >
                📄 내가 작성한 자기소개서
              </button>
              <button
                className={`${styles.tabButton} ${activeTab === "recommendedResume" ? styles.active : ""}`}
                onClick={() => setActiveTab("recommendedResume")}
              >
                ⭐ 추천 자기소개서
              </button>
            </div>
          
            <div className={`${styles.tabContent} ${activeTab === "userInput" ? styles.active : ""}`}>
              <p className={styles.resumeContent}>{userInput}</p>
            </div>
            <div className={`${styles.tabContent} ${activeTab === "recommendedResume" ? styles.active : ""}`}>
              <p className={styles.resumeContent}>{recommendedResume}</p>
            </div>
          </div>
        )}

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
