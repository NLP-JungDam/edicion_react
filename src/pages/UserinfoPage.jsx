import React from "react";
import styles from "./UserinfoPage.module.css";

function UserMyPage() {
  return(
    <div className={styles.container}>
      {/* 유저 정보 */}
      <section className={styles.infoSection}>
        <h1 className={styles.title}>내 정보</h1>
        <h2 className={styles.name}>김사과</h2>
        <p className={styles.email}>kdt@kdt.com</p>
      </section>

      {/* 메뉴 리스트 */}
      <section className={styles.menuSection}>
        <div className={styles.menuItem}>내 정보 변경하기</div>
        <div className={styles.menuItem}>내 이력서 확인하기</div>
        <div className={styles.menuItem}>내 지원 현황 확인가기</div>
        <div className={styles.btnBox}>
          <button className={styles.button}>로그아웃</button>
          <button className={styles.button}>탈퇴하기</button>
        </div>
      </section>
    </div>
  );
};

export default UserMyPage;
