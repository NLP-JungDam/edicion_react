import React, { useState } from "react";
import TalentTab from "../components/TalentTab.jsx";
import ProfileList from "../components/ProfileList.jsx";
import styles from "./RecommendedPage.module.css";

function RecommendedPage() {
  const [selectedTalent, setSelectedTalent] = useState("책임의식");

  return (
    <div className={styles.container}>
      <h1>추천 인재</h1>
      <TalentTab onSelectTalent={setSelectedTalent} />
      <ProfileList selectedTalent={selectedTalent} />
    </div>
  );
}

export default RecommendedPage;
