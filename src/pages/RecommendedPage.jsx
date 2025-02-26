import React, { useState } from "react";
import TalentTab from "../components/TalentTab.jsx";
import ProfileList from "../components/ProfileList.jsx";
import styles from "./RecommendedPage.module.css";

function RecommendedPage() {
  const [selectedTalent, setSelectedTalent] = useState("책임의식");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>추천 인재 리스트</h1>
      <p className={styles.description}>
        현재 인재상 트렌드에 맞는 인재들을 확인할 수 있어요
        <br />
        <strong>연락하기 버튼 클릭</strong> 시 추천 인재에게 기업 정보가 담긴 <strong>문자</strong>가 발송돼요!
      </p>
      <TalentTab onSelectTalent={setSelectedTalent} />
      <ProfileList selectedTalent={selectedTalent} />
    </div>
  );
}

export default RecommendedPage;
