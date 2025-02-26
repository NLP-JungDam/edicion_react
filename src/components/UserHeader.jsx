import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserHeader.module.css";
import { FaCog } from "react-icons/fa"; // 설정 아이콘

const UserHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림/닫힘 상태 관리

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      {/* 왼쪽 로고 */}
      <div className={styles.logo} onClick={() => navigate("/user/jobposting/1")}>
        <span className={styles.logoWhite}>Edi</span>
        <span className={styles.logoYellow}>ción</span>
      </div>

      {/* 오른쪽 설정 버튼 */}
      <div className={styles.rightSection}>
        <FaCog className={styles.settingsIcon} onClick={toggleMenu} />
      </div>

      {/* 드롭다운 메뉴 */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <button onClick={() => { navigate("/"); toggleMenu(); }}>메인</button>
          <button onClick={() => { navigate("/user/info"); toggleMenu(); }}>내 정보</button>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
