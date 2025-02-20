import React, { useState } from "react";
import styles from "./TalentTab.module.css";

const talents = ["책임의식", "도전정신", "소통협력", "창의성"];

function TalentTab({ onSelectTalent }) {
  const [selectedTalent, setSelectedTalent] = useState(talents[0]);

  const handleTalentClick = (talent) => {
    setSelectedTalent(talent);
    onSelectTalent(talent);
  };

  return (
    <div className={styles.tabContainer}>
      {talents.map((talent, index) => (
        <button
          key={index}
          className={`${styles.tabButton} ${selectedTalent === talent ? styles.active : ""}`}
          onClick={() => handleTalentClick(talent)}
        >
          {talent}
        </button>
      ))}
    </div>
  );
}

export default TalentTab;
