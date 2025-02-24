import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserinfoPage.module.css";

function UserMyPage() {
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");

    if (confirmLogout) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const url = `http://localhost:8080/user/${userId}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("서버 통신 에러");
        }
        return res.json();
      })
      .then((data) => setUserInfo(data))
      .catch((err) => console.error(err));
  }, []);

  return(
    <div className={styles.container}>
      {/* 유저 정보 */}
      <section className={styles.infoSection}>
        <h1 className={styles.title}>내 정보</h1>
        <h2 className={styles.name}>
          {userInfo ? userInfo.name : "로딩"}
        </h2>
        <p className={styles.email}>
          {userInfo ? userInfo.email : "로딩"}
        </p>
      </section>

      {/* 메뉴 리스트 */}
      <section className={styles.menuSection}>
        <div className={styles.menuItem}>내 정보 변경하기</div>
        <div className={styles.menuItem}>내 이력서 확인하기</div>
        <div className={styles.menuItem}>내 지원 현황 확인가기</div>
        <div className={styles.btnBox}>
          <button className={styles.button} onClick={handleLogout}>로그아웃</button>
          <button className={styles.button}>탈퇴하기</button>
        </div>
      </section>
    </div>
  );
};

export default UserMyPage;
