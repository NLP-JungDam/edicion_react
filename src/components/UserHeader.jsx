import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserHeader.module.css";

const UserHeader = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>Edición</div>
      
      <div className={styles.rightSection}>
        <button className={styles.iconButton} onClick={() => setShowMenu(!showMenu)}>⚙️</button>

        {showMenu && (
          <div className={styles.dropdownMenu}>
            <button onClick={() => navigate("/user/settings")}>설정</button>
            <button onClick={() => navigate("/user/profile")}>프로필 관리</button>
            <button onClick={() => navigate("/user/logout")}>로그아웃</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
