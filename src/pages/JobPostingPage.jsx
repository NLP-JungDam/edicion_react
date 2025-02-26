import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import JopPosting from "../components/JobPosting"; // JopPosting 컴포넌트 사용
import styles from "./JobPostingPage.module.css";

const jobCategories = [
    "서비스업", "제조·화학", "IT·웹·통신", "은행·금융업",
    "미디어·디자인", "교육업", "의료·제약·복지", "판매·유통",
    "건설업", "기관·협회"
];

const JobPostingPage = () => {
    const navigate = useNavigate();
    const { categoryCode } = useParams();
    const selectedCategory = parseInt(categoryCode) || 1;

    // 카테고리 변경 시 URL 변경
    const handleCategoryChange = (index) => {
        navigate(`/user/jobposting/${index + 1}`);
    };

    // 자기소개 페이지 이동
    const goToIntroduction = () => {
        navigate("/user/introduction");
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <section className={styles.textContainer}>
                    <h1>현재 저희 사이트에 올라와 있는 채용 공고입니다!</h1>
                    <h6>원하는 직종을 선택하여 채용정보를 확인하세요.</h6>
                </section>

                {/* 직업 선택 탭 */}
                <div className={styles.jobTabs}>
                    {jobCategories.map((category, index) => (
                        <button
                            key={category}
                            className={`${styles.jobTab} ${selectedCategory === index + 1 ? styles.activeTab : ''}`}
                            onClick={() => handleCategoryChange(index)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 채용 공고 리스트 컴포넌트 사용 */}
                <JopPosting categoryCode={selectedCategory} />

                {/* 자기소개 이동 버튼 */}
                <div className={styles.introductionContainer} onClick={goToIntroduction}>
                    <p>👉 자기소개서를 작성하려면 여기를 클릭하세요!</p>
                    <span className={styles.arrow}>→</span>
                </div>
            </div>
        </div>
    );
};

export default JobPostingPage;
