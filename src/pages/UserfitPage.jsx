import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./UserfitPage.module.css";

const UserfitPage = () => {
  const location = useLocation();
  const responseData = location.state?.responseData;
  const navigate = useNavigate();

  // 적합도(ability) 값 가져오기 (기본값 0)
  const suitability = responseData?.ability ? parseInt(responseData.ability, 10) : 0;

  const handleButtonClick = () => {
    if (suitability >= 60) {
      navigate("/user/resume");
    } else {
      alert("다시 입력해주세요!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>대충 사이트 이름</h1>

        <div className={styles.completion}>
          <span className={styles.loading}></span>
          <p>
            당신의 서비스 업무 적합도는 <strong>{suitability}%</strong>입니다
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

        {responseData?.resume && (
          <div className={styles.resumeBox}>
            <h2 className={styles.resumeTitle}>📄 추천 자기소개서</h2>
            <p className={styles.resumeContent}>{responseData.resume}</p>
          </div>
        )}

        <button className={styles.button} onClick={handleButtonClick}>
          {suitability >= 60 ? "이력서 작성하러 가기" : "다시 작성하기"}
        </button>
      </div>
    </div>
  );
};

export default UserfitPage;
