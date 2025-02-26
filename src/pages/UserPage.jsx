import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobDetail from "../components/JobDetail"; // JobDetail 사용
import styles from "./UserPage.module.css";

const jobCategories = [
    "서비스업", "제조·화학", "IT·웹·통신", "은행·금융업",
    "미디어·디자인", "교육업", "의료·제약·복지", "판매·유통",
    "건설업", "기관·협회"
];

const UserPage = () => {
    const navigate = useNavigate();
    const { categoryCode } = useParams();
    const [selectedJob, setSelectedJob] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(parseInt(categoryCode) || 1);
    const [jobs, setJobs] = useState([]); // 여러 개의 Job 데이터 저장
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 페이지 인덱스

    // 선택된 카테고리의 채용 공고 불러오기
    useEffect(() => {
        fetch(`http://localhost:8080/job/category/${selectedCategory}`)
            .then(response => response.json())
            .then(data => {
                // console.log("불러온 채용 공고 데이터:", data); // 콘솔 확인
                setJobs(data); // 전체 데이터를 저장
                setCurrentIndex(0); // 새로운 카테고리를 선택할 때 첫 페이지로 초기화
            })
            .catch(error => console.error("채용 공고 불러오기 오류:", error));
    }, [selectedCategory]);

    // 카테고리 변경 시 URL 변경
    const handleCategoryChange = (index) => {
        setSelectedCategory(index + 1);
        navigate(`/user/${index + 1}`);
    };

    // 현재 인덱스 기준으로 5개씩 데이터 슬라이싱
    const displayedJobs = jobs.slice(currentIndex, currentIndex + 2);

    // 다음 페이지
    const nextPage = () => {
        if (currentIndex + 2 < jobs.length) {
            setCurrentIndex(prev => prev + 2);
        }
    };

    // 이전 페이지
    const prevPage = () => {
        if (currentIndex - 2 >= 0) {
            setCurrentIndex(prev => prev - 2);
        }
    };

    const handleSubmit = async () => {
        if (!selectedJob) {
            alert('관심 직업을 선택해 주세요!');
            return;
        }

        if (textareaValue.length < 200) {
            alert('자기소개서 내용을 200자 이상 작성해야 합니다!');
            return;
        }

        const payload = { jobObjective: selectedJob, lorem: textareaValue };
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5500/user/validate_resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.verify) {
                alert('자기를 소개하는 글을 작성하셔야 합니다.')
                return
            }

            navigate('/user/fit', { state: { responseData: data, selectedJob } });
        } catch (error) {
            console.error('에러 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* 왼쪽 Before/After 비교 */}
            <aside className={styles.beforeAfterSection}>
                <h3>Before & After</h3>
                <div className={styles.exampleContainer}>
                    {/* Before 박스 */}
                    <div className={styles.exampleBox}>
                        <h4>Before</h4>
                        <p>
                        어릴 때부터 기술을 다루는 게 재미있어서 여러 가지를 시도해 봤습니다. AI 쪽이 흥미로워서 프로젝트도 진행했고, 요즘은 챗봇 개발을 하고 있습니다. STT/TTS 같은 음성 기술도 사용해봤고, 앞으로도 계속 배우고 싶습니다. 개발자로 성장하고 싶은데, 기술이 빠르게 변해서 공부할 게 많다고 느낍니다. 그래도 배울수록 흥미롭고 재미있어서 계속 도전하고 있습니다. AI뿐만 아니라 다양한 분야도 경험해 보고 싶고, 여러 가지 프로젝트를 진행하면서 실력을 키우고 있습니다.
                        </p>
                    </div>

                    {/* 아래 화살표 추가 */}
                    <div className={styles.arrow}>
                        <span>↓</span>
                    </div>

                    {/* After 박스 */}
                    <div className={styles.exampleBox}>
                        <h4>After</h4>
                        <p>
                        어릴 적부터 기술에 대한 호기심이 강해 다양한 분야를 탐구해왔습니다. 특히 인공지능(AI) 분야에 매료되어 관련 프로젝트를 진행하며 실력을 쌓아왔습니다. 최근에는 챗봇 개발에 집중하고 있으며, 이 과정에서 음성 인식(STT) 및 음성 합성(TTS) 기술을 활용하여 사용자 경험을 개선하는 데 기여했습니다.<br/><br/>

                        이러한 경험을 통해 문제 해결 능력을 키웠고, 팀원들과의 협업을 통해 프로젝트의 성공적인 완수를 이끌어냈습니다. 예를 들어, 챗봇 개발 프로젝트에서는 초기 기획 단계에서부터 사용자 요구사항을 분석하고, 이를 바탕으로 기능을 설계하여 최종적으로 사용자 피드백을 반영한 개선 작업을 진행했습니다. 이 과정에서 기술적 도전과제를 극복하며, 팀원들과의 소통을 통해 효율적인 해결책을 도출할 수 있었습니다.<br/><br/>
                        기술이 빠르게 변화하는 IT·웹·통신 분야에서 지속적으로 성장하고자 하는 열망이 큽니다. 새로운 기술을 배우고 적용하는 과정이 흥미롭고, 이를 통해 더 나은 개발자로 거듭나고 싶습니다. 앞으로도 다양한 프로젝트에 참여하며 경험을 쌓고, AI뿐만 아니라 여러 분야의 기술을 익혀 나가겠습니다. 이러한 경험들이 저를 더욱 발전시키고, 회사의 성장에 기여할 수 있는 기반이 될 것이라 확신합니다.<br/>
                        </p>
                    </div>
                </div>
            </aside>

            {/* 중앙 콘텐츠 */}
            <div className={styles.mainContent}>
                {/* 제목 텍스트 */}
                <section className={styles.textContainer}>
                    <h1>일을 위해 찾아온 당신! 관심 있는 채용 공고를 확인하고 자기소개서를 작성해 주세요!</h1>
                    <h6>
                        원하는 직종을 선택하고,자신의 경력, 자격증을 포함하여 본인의 자기소개서를 작성해 주시면 선택한 직업의 적합도 결과가 나와요! <br/>아래는 현재 채용 공고문들이며, 왼쪽에 있는 before, after를 참고하여 작성해주세요!
                    </h6>
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

                {/* JobDetail 여러 개 표시 (가로 5개) */}
                <div className={styles.jobContainer}>
                    {displayedJobs.length > 0 ? (
                        displayedJobs.map((job, index) => (
                            <JobDetail key={index} job={job} />
                        ))
                    ) : (
                        <p className={styles.noJobs}>해당 직군의 공고가 없습니다.</p>
                    )}
                </div>

                {/* 이전 / 다음 버튼 (화살표) */}
                <div className={styles.pagination}>
                    <button onClick={prevPage} disabled={currentIndex === 0}>◀</button>
                    <button onClick={nextPage} disabled={currentIndex + 2 >= jobs.length}>▶</button>
                </div>
                
                {/* 입력 폼 */}
                <section className={styles.inputContainer}>
                    <select value={selectedJob} onChange={e => setSelectedJob(e.target.value)}>
                        <option value="">직업 선택</option>
                        <option value="서비스업">서비스업</option>
                        <option value="제조·화학">제조·화학</option>
                        <option value="IT·웹·통신">IT·웹·통신</option>
                        <option value="은행·금융업">은행·금융업</option>
                        <option value="미디어·디자인">미디어·디자인</option>
                        <option value="교육업">교육업</option>
                        <option value="의료·제약·복지">의료·제약·복지</option>
                        <option value="판매·유통">판매·유통</option>
                        <option value="건설업">건설업</option>
                        <option value="기관·협회">기관·협회</option>
                    </select>
                    <textarea value={textareaValue} onChange={e => setTextareaValue(e.target.value)} placeholder="200자 이상의 자기소개서를 입력하세요."></textarea>
                    <button onClick={handleSubmit}>입력하기</button>
                </section>
                {loading && (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>적합성을 평가 중입니다! 잠시만 기다려 주세요.</p>
                </div>
            )}
            </div>
        </div>
    );
};

export default UserPage;
