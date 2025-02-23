import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Doughnut } from "react-chartjs-2"; // 그래프 라이브러리 추가
import "chart.js/auto"; // Chart.js 자동 등록
import styles from "./UserfitPage.module.css";

const UserfitPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ `responseData`에서 데이터 추출 (초기값 설정)
  const [responseData, setResponseData] = useState(location.state?.responseData || {});
  const [jobObjective, setJobObjective] = useState(location.state?.jobObjective || "선택한 직무 없음");
  const [suitability, setSuitability] = useState(0);
  const [userInput, setUserInput] = useState("입력된 자기소개서가 없습니다.");
  const [recommendedResume, setRecommendedResume] = useState("추천 자기소개서가 없습니다.");

  // ✅ `responseData` 업데이트 (페이지 로드 시 한 번 실행)
  useEffect(() => {
    if (responseData) {
      setSuitability(parseInt(responseData.ability || "0", 10));
      setUserInput(responseData.lorem || "입력된 자기소개서가 없습니다.");
      setRecommendedResume(responseData.resume || "추천 자기소개서가 없습니다.");
    }
  }, [responseData]);

  // ✅ 탭 상태 추가 (내가 작성한 자기소개서 / 추천 자기소개서)
  const [activeTab, setActiveTab] = useState("userInput");

  // ✅ 이력서 저장 후 이동
  const handleResumeClick = async () => {
    try {
      // 로그인한 유저 ID 가져오기 (예: 헤더에서 userId 추출)
      const userId = localStorage.getItem("userId") || "testUser"; // 예제 코드 (실제 로그인한 ID 필요)
      console.log(userId)
      const payload = {
        userId,
        jobObjective,
        lorem: userInput,
        resume: recommendedResume,
      };

      const response = await fetch("http://localhost:8080/api/saveResume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      const data = await response.json();
      console.log("📌 저장 완료:", data);

      navigate("/user/resume"); // 저장 후 이력서 작성 페이지 이동
    } catch (error) {
      console.error("❌ 저장 중 오류 발생:", error);
    }
  };

  // ✅ 다시 작성하기 버튼
  const handleRetryClick = () => {
    navigate(-1); // 이전 화면으로 돌아가기
  };

  // ✅ 적합도 % 도넛 차트 데이터
  const chartData = {
    labels: ["적합도", "부적합"],
    datasets: [
      {
        data: [suitability, 100 - suitability],
        backgroundColor: ["#8a64d6", "#e0e0e0"],
        hoverBackgroundColor: ["#7a5fc4", "#d0d0d0"],
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>대충 사이트 이름</h1>

        {/* ✅ 적합도 도넛 그래프 추가 */}
        <div className={styles.chartContainer}>
          <Doughnut data={chartData} />
          <p className={styles.chartText}>
            당신이 선택한 직무 <strong>{jobObjective}</strong>의<br />
            적합도는 <strong>{suitability}%</strong>입니다.
          </p>
        </div>

        {suitability >= 60 ? (
          <div className={styles.description}>
            작성한 자기소개서를 직무 적합도에 맞게 보완하여 이력서를 작성해 드려요!
            작성된 이력서를 원하는 업무의 일자리에 제출하세요.
          </div>
        ) : (
          <div className={styles.description}>
            서비스 관련 성공 사례나 실패 사례를 공부하고 대처법을 익혀 두세요.
            다양한 문제 해결 방법을 생각하는 연습을 하세요. 갑작스러운 상황에서도
            즉각적으로 대응할 수 있도록 예상 가능한 문제를 정리하고 해결법을 미리 고민해 보세요.
          </div>
        )}

        {/* ✅ 탭 UI 추가 */}
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

        {/* ✅ 선택한 탭 내용 표시 */}
        <div className={styles.resumeBox}>
          {activeTab === "userInput" ? (
            <>
              <h2 className={styles.resumeTitle}>📝 내가 작성한 자기소개서</h2>
              <p className={styles.resumeContent}>{userInput}</p>
            </>
          ) : (
            <>
              <h2 className={styles.resumeTitle}>📄 추천 자기소개서</h2>
              <p className={styles.resumeContent}>{recommendedResume}</p>
            </>
          )}
        </div>

        {/* ✅ 버튼 2개 배치 */}
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSecondary} onClick={handleRetryClick}>
            다시 작성하기
          </button>
          <button className={styles.buttonPrimary} onClick={handleResumeClick}>
            이력서 작성하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserfitPage;
