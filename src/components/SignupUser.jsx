import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignupUser.module.css";

const SignupUser = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        year: "",
        month: "",
        day: "",
        password: "",
        passwordConfirm: "",
        education: [], // ✅ 학력을 배열로 변경
        license: [],
        history: [],
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ 학력 추가/삭제
    const addEducation = () => {
        setForm({ ...form, education: [...form.education, { graduated: "", department: "" }] });
    };
    const removeEducation = (index) => {
        setForm({ ...form, education: form.education.filter((_, i) => i !== index) });
    };
    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...form.education];
        updatedEducation[index][field] = value;
        setForm({ ...form, education: updatedEducation });
    };

    // ✅ 자격증 추가/삭제
    const addLicense = () => {
        setForm({ ...form, license: [...form.license, { name: "", date: "" }] });
    };
    const removeLicense = (index) => {
        setForm({ ...form, license: form.license.filter((_, i) => i !== index) });
    };
    const handleLicenseChange = (index, field, value) => {
        const updatedLicenses = [...form.license];
        updatedLicenses[index][field] = value;
        setForm({ ...form, license: updatedLicenses });
    };

    // ✅ 경력 추가/삭제
    const addHistory = () => {
        setForm({ ...form, history: [...form.history, { title: "", date: "", content: "" }] });
    };
    const removeHistory = (index) => {
        setForm({ ...form, history: form.history.filter((_, i) => i !== index) });
    };
    const handleHistoryChange = (index, field, value) => {
        const updatedHistory = [...form.history];
        updatedHistory[index][field] = value;
        setForm({ ...form, history: updatedHistory });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formattedData = {
            name: form.name,
            email: form.email,
            phoneNumber: form.phoneNumber,
            gender: form.gender,
            birth: `${form.year}-${form.month}-${form.day}`,
            password: form.password,
            education: form.education, // ✅ 학력 데이터를 리스트로 전송
            license: form.license,
            history: form.history,
        };

        try {
            const response = await fetch("http://localhost:8080/auth/signup/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            const data = await response.json();
            console.log(data);
            console.log(formattedData);

            if (response.ok) {
                alert("회원가입 성공!");
                navigate("/login");
            } else {
                alert(`회원가입 실패: ${data.message}`);
            }
        } catch (error) {
            console.error("회원가입 요청 오류:", error);
            alert("서버 오류 발생!");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formTitle}>개인 회원가입</div>
                <input type="text" name="name" placeholder="이름" onChange={handleChange} className={styles.inputField} />
                <input type="email" name="email" placeholder="이메일" onChange={handleChange} className={styles.inputField} />
                <input type="text" name="phoneNumber" placeholder="전화번호" onChange={handleChange} className={styles.inputField} />
                <select name="gender" onChange={handleChange} className={styles.inputFields}>
                    <option value="">성별 선택</option>
                    <option value="남">남성</option>
                    <option value="여">여성</option>
                </select>
                <div className={styles.birthInputContainer}>
                    <input type="text" name="year" placeholder="년도" onChange={handleChange} className={styles.inputField} />
                    <input type="text" name="month" placeholder="월" onChange={handleChange} className={styles.inputField} />
                    <input type="text" name="day" placeholder="일" onChange={handleChange} className={styles.inputField} />
                </div>

                {/* ✅ 학력 입력 */}
                <div className={styles.dynamicSection}>
                    <div className={styles.dynamicTitle}>
                        <label>학력</label>
                        <button type="button" onClick={addEducation} className={styles.smallButton}>+</button>
                    </div>
                    {form.education.map((edu, index) => (
                        <div key={index} className={styles.dynamicItem}>
                            <input type="text" placeholder="졸업 학력" value={edu.graduated} onChange={(e) => handleEducationChange(index, "graduated", e.target.value)} className={styles.inputField} />
                            <input type="text" placeholder="전공 / 학과" value={edu.department} onChange={(e) => handleEducationChange(index, "department", e.target.value)} className={styles.inputField} />
                            <button type="button" onClick={() => removeEducation(index)} className={styles.smallButton}>-</button>
                        </div>
                    ))}
                </div>

                {/* ✅ 자격증 입력 */}
                <div className={styles.dynamicSection}>
                    <div className={styles.dynamicTitle}>
                        <label>자격증</label>
                        <button type="button" onClick={addLicense} className={styles.smallButton}>+</button>
                    </div>
                    {form.license.map((license, index) => (
                        <div key={index} className={styles.dynamicItem}>
                            <input type="text" placeholder="자격증 이름" value={license.name} onChange={(e) => handleLicenseChange(index, "name", e.target.value)} className={styles.inputField} />
                            <input type="date" value={license.date} onChange={(e) => handleLicenseChange(index, "date", e.target.value)} className={styles.inputField} />
                            <button type="button" onClick={() => removeLicense(index)} className={styles.smallButton}>-</button>
                        </div>
                    ))}
                </div>

                {/* ✅ 경력 입력 */}
                <div className={styles.dynamicSection}>
                    <div className={styles.dynamicTitle}>
                        <label>경력</label>
                        <button type="button" onClick={addHistory} className={styles.smallButton}>+</button>
                    </div>
                    {form.history.map((history, index) => (
                        <div key={index} className={styles.dynamicItem}>
                            <input type="text" placeholder="경력 제목" value={history.title} onChange={(e) => handleHistoryChange(index, "title", e.target.value)} className={styles.inputField} />
                            <input type="text" placeholder="경력 날짜" value={history.date} onChange={(e) => handleHistoryChange(index, "date", e.target.value)} className={styles.inputField} />
                            <textarea placeholder="경력 설명" value={history.content} onChange={(e) => handleHistoryChange(index, "content", e.target.value)} className={styles.textarea} />
                            <button type="button" onClick={() => removeHistory(index)} className={styles.smallButton}>-</button>
                        </div>
                    ))}
                </div>

                <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} className={styles.inputField} />
                <input type="password" name="passwordConfirm" placeholder="비밀번호 확인" onChange={handleChange} className={styles.inputField} />
                <button className={styles.submitButton} onClick={handleSubmit}>회원가입</button>
            </div>
        </div>
    );
};

export default SignupUser;
