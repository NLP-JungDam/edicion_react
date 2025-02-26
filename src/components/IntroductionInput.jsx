import React, { useState } from 'react';
import styles from './IntroductionInput.module.css';

const IntroductionInput = ({ onSubmit }) => {
    const [selectedJob, setSelectedJob] = useState('');
    const [textareaValue, setTextareaValue] = useState('');

    const handleSubmit = () => {
        if (!selectedJob) {
            alert('관심 직업을 선택해 주세요!');
            return;
        }

        if (textareaValue.length < 200) {
            alert('자기소개서 내용을 200자 이상 작성해야 합니다!');
            return;
        }

        onSubmit(selectedJob, textareaValue);
    };

    return (
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
            <textarea
                className={styles.textarea}
                value={textareaValue}
                onChange={e => setTextareaValue(e.target.value)}
                placeholder="200자 이상의 자기소개서를 입력하세요."
            ></textarea>
            <button onClick={handleSubmit}>입력하기</button>
        </section>
    );
};

export default IntroductionInput;
