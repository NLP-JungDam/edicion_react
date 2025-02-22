import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate 추가
import styles from "./UserfitPage.module.css";

const UserfiPage = () => {
  const location = useLocation();
  const responseData = location.state?.responseData;
  const [suitability, setSuitability] = useState(70); // 예제 값 (변경 가능)
  const navigate = useNavigate(); // 네비게이션 함수

  const handleButtonClick = () => {
    if (suitability >= 60) {
      navigate("/user/resume"); // 60% 이상이면 이력서 작성 페이지로 이동
    } else {
      // 60% 미만이면 다시 작성 (추가 로직 가능)
      alert("다시 입력해주세요!");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        {responseData? (
          <pre>{JSON.stringify(responseData)}</pre>
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>대충 사이트 이름</h1>
        <p className={styles.completion}>
          <span className={styles.loading}></span> 당신의 서비스 업무 적합도는 <strong>{suitability}%</strong>입니다
        </p>
        
        {suitability >= 60 ? (
          // 60% 이상일 때 보여줄 화면
          <div className={styles.description}>
            작성한 자기소개서를 직무 적합도에 맞게 보완하여 이력서를 작성해 드려요!
            작성된 이력서를 원하는 업무의 일자리에 제출하세요.
          </div>
        ) : (
          // 60% 미만일 때 보여줄 화면
          <div className={styles.description}>
            서비스 관련 성공 사례나 실패 사례를 공부하고 대처법을 익혀 두세요. 다양한 문제 해결 방법을 생각하는 연습을 하세요. 갑작스러운 상황에서도 즉각적으로 대응할 수 있도록 예상 가능한 문제를 정리하고 해결법을 미리 고민해 보세요.
          </div>
        )}

        <button className={styles.button} onClick={handleButtonClick}>
          {suitability >= 60 ? "이력서 작성하러 가기" : "다시 작성하기"}
        </button>
      </div>
    </div>
  );
};

export default UserfiPage;
