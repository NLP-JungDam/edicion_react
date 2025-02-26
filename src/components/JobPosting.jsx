import React, { useState, useEffect } from "react";
import JobDetail from "./JobDetail"; // JobDetail 사용
import styles from "./JobPosting.module.css";

const JopPosting = ({ categoryCode }) => {
    const [jobs, setJobs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 선택된 카테고리의 채용 공고 불러오기
    useEffect(() => {
        fetch(`http://localhost:8080/job/category/${categoryCode}`)
            .then(response => response.json())
            .then(data => {
                setJobs(data);
                setCurrentIndex(0); // 새로운 카테고리를 선택하면 첫 페이지로 초기화
            })
            .catch(error => console.error("채용 공고 불러오기 오류:", error));
    }, [categoryCode]);

    // 현재 인덱스 기준으로 6개씩 데이터 슬라이싱
    const displayedJobs = jobs.slice(currentIndex, currentIndex + 6);

    // 다음 페이지
    const nextPage = () => {
        if (currentIndex + 6 < jobs.length) {
            setCurrentIndex(prev => prev + 6);
        }
    };

    // 이전 페이지
    const prevPage = () => {
        if (currentIndex - 6 >= 0) {
            setCurrentIndex(prev => prev - 6);
        }
    };

    return (
        <div className={styles.container}>
            {/* Job 리스트 */}
            <div className={styles.jobContainer}>
                {displayedJobs.length > 0 ? (
                    displayedJobs.map((job, index) => (
                        <JobDetail key={index} job={job} />
                    ))
                ) : (
                    <p className={styles.noJobs}>해당 직군의 공고가 없습니다.</p>
                )}
            </div>

            {/* 페이지네이션을 별도 컨테이너로 이동 */}
            <div className={styles.paginationContainer}>
                <button onClick={prevPage} disabled={currentIndex === 0}>◀</button>
                <button onClick={nextPage} disabled={currentIndex + 6 >= jobs.length}>▶</button>
            </div>
        </div>
    );
};

export default JopPosting;
