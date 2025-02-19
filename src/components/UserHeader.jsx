import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserHeader.module.css";
import { FaCog } from "react-icons/fa"; // 설정 아이콘

const UserHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림/닫힘 상태 관리

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      {/* 왼쪽 로고 */}
      <Link to="/user" className={styles.logo}>
        <span className={styles.logoBlack}>Edi</span>
        <span className={styles.logoOrange}>ción</span>
      </Link>

      {/* 오른쪽 설정 버튼 */}
      <div className={styles.rightSection}>
        <FaCog className={styles.settingsIcon} onClick={toggleMenu} />
      </div>

      {/* 토글되는 네비게이션 메뉴 */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <ul>
            <li>
              <Link to="/user" onClick={toggleMenu}>메인</Link>
            </li>
            {/* <li>
              <Link to="/user/fit" onClick={toggleMenu}>업무 적합도</Link>
            </li>
            <li>
              <Link to="/user/resume" onClick={toggleMenu}>이력서</Link>
            </li>
            <li>
              <Link to="/user/job/list" onClick={toggleMenu}>구직 리스트</Link>
            </li> */}
            <li>
              <Link to="/mypage" onClick={toggleMenu}>내 정보</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
