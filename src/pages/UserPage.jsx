import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserPage.module.css";

const UserPage = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const handleSubmit = async () => {
    if (!selectedJob) {
      alert("관심 직업을 선택해 주세요!");
      return;
    }

    const payload = {
      jobObjective: selectedJob,
      lorem: textareaValue
    };

    try {
      const response = await fetch("http://localhost:8000/user/validate_resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("데이터 전송 실패:", response.status);
      } else {
        const data = await response.json();
        navigate("/user/fit",  { state: { responseData: data } });
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* 제목 텍스트 section */}
      <section className={styles.textContainer}>
        <h1>일을 위해 찾아온 당신을 소개해 주세요</h1>
        <h6>
          직무 적합성 분석을 원하는 직종을 선택하고 <br /> 자신의 경력, 자격증을 포함하여 본인의 자기소개서를 작성해 주면
          <br /> 선택한 직업의 적합도 결과가 나와요!
        </h6>
      </section>

      {/* 예시 블럭 section */}
      <section className={styles.exContainer}>
        <div className={styles.exBox}>
          나는 어렸을 때부터 애를 키우기 시작해서 일 경험을 한번도 하지 못했어 근데 애를 키우게 되면서 가정적인 일에 자신있어졌어!
        </div>
        <div className={styles.exBox}>
          저는 한국에 온 지 5년이 되었어요. 처음에는 말이 서툴러서 힘들었지만 지금은 한국어로 일상 대화도 할 수 있고, 간단한 문서도 읽을 수 있어요. 고향에서는 농사를 지었고, 손으로 하는 일에 익숙해요. 성실하게 일할 자신 있어요!
        </div>
        <div className={styles.exBox}>
          혼자 아이를 키우면서 정말 많은 걸 배웠어요. 시간 관리, 경제적인 계획, 아이 교육까지 혼자 해내야 했거든요. 이런 경험 덕분에 책임감이 강하고, 문제 해결 능력이 좋아졌어요. 고객 응대나 관리 업무에 자신 있어요!
        </div>
      </section>

      {/* Input section */}
      <section className={styles.inputContainer}>
        <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
          <option value="">직업 선택</option>
          <option value="서비스업">서비스업</option>
          <option value="제조·화학">제조·화학</option>
          <option value="IT·웹·통신">IT·웹·통신</option>
          <option value="은행·금융업">은행·금융업</option>
          <option value="미디어·디자인">미디어·디자인</option>
          <option value="교육업">교육업</option>
          <option value="의료·제약·복지">의료·제약·복지</option>
          <option value="판매·유통">판매·유통</option>
          <option value="건설업">건설업</option>
          <option value="기관·협회">기관·협회</option>
        </select>
        <textarea
          className={styles.textarea}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>입력하기</button>
      </section>
    </div>
  );
};

export default UserPage;
