import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IntroductionPage.module.css';
import IntroductionInput from '../components/IntroductionInput';

const IntroductionPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (selectedJob, textareaValue) => {
        const payload = {
            jobObjective: selectedJob,
            lorem: textareaValue
        };
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5500/user/validate_resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.verify === false) {
                alert('입력하신 글은 자기소개서 형태가 아닙니다. \n본인을 소개하는 글을 작성해 주세요.');
                return;
            }

            if (!response.ok) {
                console.error('데이터 전송 실패:', response.status);
                setLoading(false);
                return;
            }

            console.log(data);
            console.log(selectedJob);
            navigate('/user/fit', { state: { responseData: data, selectedJob } });
        } catch (error) {
            console.error('에러 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* 제목 텍스트 section */}
            <section className={styles.textContainer}>
                <h1>일을 위해 찾아온 당신을 소개해 주세요</h1>
                <h3 className={styles.importantNote}>
                    직무 적합성 분석을 원하는 직종을 선택하고 자신의 경력, 자격증을 포함하여 본인의 자기소개서를 작성해 주시면 <br/>
                    선택한 직업의 적합도 결과가 나와요!
                </h3>
                <h6>
                    작성하시는 자기소개서의 퀄리티에 따라 <strong>적합도</strong>와 <strong>기업 매칭률</strong>이 달라질 수 있습니다.<br />
                    최대한 성의 있게 작성해 주세요!
                </h6>
            </section>

            {/* 예시 블럭 section */}
            <section className={styles.exContainer}>
                <div className={styles.exampleContainer}>
                    {/* Before 박스 */}
                    <div className={`${styles.exampleBox} ${styles.beforeBox}`}>
                        <h4>Before</h4>
                        <p>
                            어릴 때부터 기술을 다루는 게 재미있어서 여러 가지를 시도해 봤습니다. 
                            AI 쪽이 흥미로워서 프로젝트도 진행했고, 요즘은 챗봇 개발을 하고 있습니다. 
                            STT/TTS 같은 음성 기술도 사용해봤고, 앞으로도 계속 배우고 싶습니다. 
                            개발자로 성장하고 싶은데, 기술이 빠르게 변해서 공부할 게 많다고 느낍니다. 
                            그래도 배울수록 흥미롭고 재미있어서 계속 도전하고 있습니다. 
                            AI뿐만 아니라 다양한 분야도 경험해 보고 싶고, 여러 가지 프로젝트를 진행하면서 실력을 키우고 있습니다.
                        </p>
                    </div>

                    {/* 아래 화살표 추가 */}
                    <div className={styles.arrow}><span>↓</span></div>

                    {/* After 박스 */}
                    <div className={`${styles.exampleBox} ${styles.afterBox}`}>
                        <h4>After</h4>
                        <p>
                            어릴 적부터 기술에 대한 호기심이 강해 다양한 분야를 탐구해왔습니다. 
                            특히 인공지능(AI) 분야에 매료되어 관련 프로젝트를 진행하며 실력을 쌓아왔습니다. 
                            최근에는 챗봇 개발에 집중하고 있으며, 이 과정에서 음성 인식(STT) 및 음성 합성(TTS) 기술을 활용하여 사용자 경험을 개선하는 데 기여했습니다.<br/><br/>

                            이러한 경험을 통해 문제 해결 능력을 키웠고, 팀원들과의 협업을 통해 프로젝트의 성공적인 완수를 이끌어냈습니다. 
                            예를 들어, 챗봇 개발 프로젝트에서는 초기 기획 단계에서부터 사용자 요구사항을 분석하고, 이를 바탕으로 기능을 설계하여 
                            최종적으로 사용자 피드백을 반영한 개선 작업을 진행했습니다. 
                            이 과정에서 기술적 도전과제를 극복하며, 팀원들과의 소통을 통해 효율적인 해결책을 도출할 수 있었습니다.<br/><br/>

                            기술이 빠르게 변화하는 IT·웹·통신 분야에서 지속적으로 성장하고자 하는 열망이 큽니다. 
                            새로운 기술을 배우고 적용하는 과정이 흥미롭고, 이를 통해 더 나은 개발자로 거듭나고 싶습니다. 
                            앞으로도 다양한 프로젝트에 참여하며 경험을 쌓고, AI뿐만 아니라 여러 분야의 기술을 익혀 나가겠습니다. 
                            이러한 경험들이 저를 더욱 발전시키고, 회사의 성장에 기여할 수 있는 기반이 될 것이라 확신합니다.<br/>
                        </p>
                    </div>
                </div>
            </section>

            {/* 입력 섹션 */}
            <IntroductionInput onSubmit={handleSubmit} />

            {loading && (
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>적합성을 평가 중입니다! 잠시만 기다려 주세요.</p>
                </div>
            )}
        </div>
    );
};

export default IntroductionPage;
