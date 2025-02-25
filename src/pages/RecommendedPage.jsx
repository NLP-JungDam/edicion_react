import React, { useState } from "react";
import TalentTab from "../components/TalentTab.jsx";
import ProfileList from "../components/ProfileList.jsx";
import styles from "./RecommendedPage.module.css";

function RecommendedPage() {
  const [selectedTalent, setSelectedTalent] = useState("책임의식");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>추천 인재</h1>
      <p className={styles.description}>
        업계 트렌드와 기업 요구에 맞는 인재를 추천해 드립니다.
        <br />
        우수한 인재를 빠르게 만나보세요!
      </p>
      <TalentTab onSelectTalent={setSelectedTalent} />
      <ProfileList selectedTalent={selectedTalent} />
    </div>
  );
}

export default RecommendedPage;
