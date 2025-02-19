// Footer

import React from "react";
import styles from "./Footer.module.css"; // CSS 파일 추가

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 우리 취업 플랫폼. 모든 권리 보유.</p>
      <p>직업 검색 | Edición | 맞춤 직업 추천</p>
      <p>문의: support@ourjobplatform.com</p>
      <p>이용 약관 | 개인정보 처리방침</p>
    </footer>
  );
};

export default Footer;
