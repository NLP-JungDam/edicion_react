import React from "react";
import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <div>
      <h1>사용자 메인 페이지</h1>
      <p>여기에서 이력서를 작성하거나 확인할 수 있습니다.</p>
      <Link to="/user/resume">
        <button>이력서 작성하기</button>
      </Link>
    </div>
  );
};

export default UserPage;
