import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa"; // 설정 아이콘
import styles from "./UserHeader.module.css";

const UserHeader = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={styles.header}>
      {/* 왼쪽 로고 */}
      <div className={styles.logo} onClick={() => navigate("/user")}>
        <span className={styles.logoBlack}>Edi</span>
        <span className={styles.logoOrange}>ción</span>
      </div>

      {/* 오른쪽 설정 버튼 */}
      <div className={styles.rightSection}>
        <FaCog className={styles.settingsIcon} onClick={() => setShowMenu(!showMenu)} />
      </div>

      {/* 토글되는 네비게이션 메뉴 */}
      {showMenu && (
        <div className={styles.dropdownMenu}>
          <ul>
            <li>
              <button onClick={() => { navigate("/user"); setShowMenu(false); }}>메인</button>
            </li>
            <li>
              <button onClick={() => { navigate("/mypage"); setShowMenu(false); }}>내 정보</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
