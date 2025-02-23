import React from "react";
import styles from "./Resume.module.css";

const Resume = ({ resumeData, isEditing, handleChange, handleAddField, handleRemoveField }) => {
  return (
    <div className={styles.resumeWrapper}>
      {/* 왼쪽 프로필 정보 */}
      <div className={styles.profileSection}>
        <div className={styles.profileImage}></div>
        <div className={styles.profileInfo}>
          <p><strong>이름</strong> <br /> {resumeData.name}</p>
          <p><strong>생년월일</strong> <br /> {resumeData.birth}</p>
          <p><strong>이메일</strong> <br /> {resumeData.email}</p>
          <p><strong>연락처</strong> <br /> {resumeData.phone}</p>
          <p><strong>주소</strong> <br /> {resumeData.address}</p>
        </div>
      </div>

      {/* 오른쪽 이력서 상세 정보 */}
      <div className={styles.detailsSection}>

        {/* ✅ 학력사항 */}
        <div className={styles.section}>
          <h3 className={styles.h3}>학력사항</h3>
          {resumeData.education?.length === 0 && isEditing && <p>추가 버튼을 눌러 학력을 입력하세요.</p>}
          {resumeData.education?.map((edu, index) => (
            <div key={index} className={styles.inputContainer}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={edu.graduated}
                    placeholder="졸업 여부"
                    onChange={(e) => handleChange(e, "education", index, "graduated")}
                  />
                  <input
                    type="text"
                    className={styles.inputField}
                    value={edu.department}
                    placeholder="학과명"
                    onChange={(e) => handleChange(e, "education", index, "department")}
                  />
                  <button className={styles.removeButton} onClick={() => handleRemoveField("education", index)}>−</button>
                </>
              ) : (
                <p>{edu.graduated} / {edu.department}</p>
              )}
            </div>
          ))}
          {isEditing && <button className={styles.addButton} onClick={() => handleAddField("education", { graduated: "", department: "" })}>+ 추가</button>}
        </div>

        {/* ✅ 경력사항 */}
        <div className={styles.section}>
          <h3 className={styles.h3}>경력사항</h3>
          {resumeData.experience?.length === 0 && isEditing && <p>추가 버튼을 눌러 경력을 입력하세요.</p>}
          {resumeData.experience?.map((exp, index) => (
            <div key={index} className={styles.inputContainer}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={exp.title}
                    placeholder="경력 제목"
                    onChange={(e) => handleChange(e, "experience", index, "title")}
                  />
                  <input
                    type="text"
                    className={styles.inputField}
                    value={exp.date}
                    placeholder="경력 날짜"
                    onChange={(e) => handleChange(e, "experience", index, "date")}
                  />
                  <textarea
                    className={styles.textareaField}
                    value={exp.content}
                    placeholder="경력 내용"
                    onChange={(e) => handleChange(e, "experience", index, "content")}
                  />
                  <button className={styles.removeButton} onClick={() => handleRemoveField("experience", index)}>−</button>
                </>
              ) : (
                <p>{exp.title} ({exp.date})</p>
              )}
            </div>
          ))}
          {isEditing && <button className={styles.addButton} onClick={() => handleAddField("experience", { title: "", date: "", content: "" })}>+ 추가</button>}
        </div>

        {/* ✅ 자격증 */}
        <div className={styles.section}>
          <h3 className={styles.h3}>자격증</h3>
          {resumeData.certificates?.length === 0 && isEditing && <p>추가 버튼을 눌러 자격증을 입력하세요.</p>}
          {resumeData.certificates?.map((cert, index) => (
            <div key={index} className={styles.inputContainer}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={cert.name}
                    placeholder="자격증 이름"
                    onChange={(e) => handleChange(e, "certificates", index, "name")}
                  />
                  <input
                    type="date"
                    className={styles.inputField}
                    value={cert.date}
                    placeholder="취득 날짜"
                    onChange={(e) => handleChange(e, "certificates", index, "date")}
                  />
                  <button className={styles.removeButton} onClick={() => handleRemoveField("certificates", index)}>−</button>
                </>
              ) : (
                <p>{cert.name} ({cert.date})</p>
              )}
            </div>
          ))}
          {isEditing && <button className={styles.addButton} onClick={() => handleAddField("certificates", { name: "", date: "" })}>+ 추가</button>}
        </div>

        {/* ✅ 자기소개서 */}
        <div className={styles.section}>
          <h3 className={styles.h3}>자기소개서</h3>
          {isEditing ? (
            <textarea
              className={styles.textareaField}
              value={resumeData?.selfIntroduction || ""} // ✅ resumeData가 없을 경우 빈 문자열로 처리
              onChange={(e) => handleChange(e, "selfIntroduction")}
              onInput={(e) => {
                e.target.style.height = "auto"; // 기존 높이 초기화
                e.target.style.height = `${e.target.scrollHeight}px`; // 입력된 내용에 맞춰 높이 조정
              }}
            />
          ) : (
            <p>{resumeData?.selfIntroduction || "자기소개서를 입력해주세요."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
