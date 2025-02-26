import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EmployerHeader.module.css";
import { FaCog } from "react-icons/fa"; // 설정 아이콘

const EmployerHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 드롭다운 상태 관리
  const [activeMenu, setActiveMenu] = useState("applicants"); // 현재 선택된 메뉴

  const handleMenuClick = (menu, path) => {
    setActiveMenu(menu);
    navigate(path);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      {/* 왼쪽 로고 */}
      <div className={styles.logo} onClick={() => navigate("/")}>
        <span className={styles.logoWhite}>Edi</span>
        <span className={styles.logoBlue}>ción</span>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className={styles.menuContainer}>
        <span
          className={`${styles.menuItem} ${activeMenu === "applicants" ? styles.activeMenu : ""}`}
          onClick={() => handleMenuClick("applicants", "/employer/applicants")}
        >
          지원 현황
        </span>
        <span
          className={`${styles.menuItem} ${activeMenu === "recommended" ? styles.activeMenu : ""}`}
          onClick={() => handleMenuClick("recommended", "/employer/recommended")}
        >
          추천 인재
        </span>
      </nav>

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
