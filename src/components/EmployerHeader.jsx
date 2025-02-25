import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmployerHeader.module.css";
import { FaCog } from "react-icons/fa"; // 설정 아이콘

const EmployerHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 드롭다운 상태 관리

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      {/* 왼쪽 로고 */}
      <div className={styles.logo} onClick={() => navigate("/employer/applicants")}>
        <span className={styles.logoWhite}>Edi</span>
        <span className={styles.logoBlue}>ción</span>
      </div>

      {/* 중앙 버튼들 */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => navigate("/employer/applicants")}>
          지원 현황
        </button>
        <button className={styles.button} onClick={() => navigate("/employer/recommended")}>
          추천 인재
        </button>
      </div>

      {/* 오른쪽 설정 버튼 */}
      <div className={styles.rightSection}>
        <FaCog className={styles.settingsIcon} onClick={toggleMenu} />
      </div>

      {/* 드롭다운 메뉴 */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <button onClick={() => { navigate("/"); toggleMenu(); }}>메인</button>
          <button onClick={() => { navigate("/profile"); toggleMenu(); }}>내 정보</button>
        </div>
      )}
    </header>
  );
};

export default EmployerHeader;
