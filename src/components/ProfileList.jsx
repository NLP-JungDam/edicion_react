import React, { useState, useEffect } from "react";
import styles from "./ProfileList.module.css";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const talents = ["책임의식", "도전정신", "소통협력", "창의성"];

function ProfileList({ selectedTalent }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // 선택된 Talent(인재상)에 따라 API 요청
  useEffect(() => {
    const fetchApplicants = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const talentIndex = talents.indexOf(selectedTalent); // 인재상 이름을 숫자 코드로 변환
        if (talentIndex === -1) return;

        const response = await fetch(`http://localhost:8080/employer/talent/${talentIndex}`);

        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();

        if (data.data.length === 0) {
          setErrorMessage("해당하는 인재가 없습니다.");
        }

        setFilteredApplicants(data.data || []);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setErrorMessage("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
    setCurrentPage(0); // Talent 변경 시 첫 페이지로 이동
  }, [selectedTalent]);

  const pageCount = Math.ceil(filteredApplicants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSendSMS = async (phoneNumber) => {
    if (!phoneNumber) {
      alert("전화번호가 없습니다.");
      return;
    }

    const businessNumber = localStorage.getItem("businessNumber");
  
    try {
      const response = await fetch(`http://localhost:8080/employer/sms/${businessNumber}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("문자가 성공적으로 전송되었습니다.");
      } else {
        alert(`오류 발생: ${data.error}`);
      }
    } catch (error) {
      console.error("SMS 전송 오류:", error);
      alert("문자 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p className={styles.message}>유저 로딩 중</p>
      ) : errorMessage ? (
        <p className={styles.message}>{errorMessage}</p>
      ) : (
        <>
          <div className={styles.grid}>
            {filteredApplicants
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((applicant) => (
                <div key={applicant.userId} className={styles.card}>
                  <div className={styles.header}>
                    <h3 className={styles.name}>{applicant.name}</h3>
                    <button 
                      className={styles.call}
                      onClick={() => handleSendSMS(applicant.phone?.number)}
                    >
                      연락하기
                    </button>
                  </div>
                  <div className={styles.details}>
                    <p>생년월일: {new Date(applicant.birth).toLocaleDateString()}</p>
                    <p>전화번호: {applicant.phone?.number}</p>
                    <p>이메일: {applicant.email}</p>
                    <p>자격증: {applicant.license?.map((lic) => lic.name).join(", ") || "없음"}</p>
                    <p>경력: {applicant.history?.map((his) => his.title).join(", ") || "없음"}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* 페이지네이션 */}
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={<FiChevronLeft />}
              nextLabel={<FiChevronRight />}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              pageLinkClassName={styles.paginationLink}
              activeLinkClassName={styles.active}
              previousClassName={styles.pageButton}
              nextClassName={styles.pageButton}
              disabledClassName={styles.disabled}
              pageRangeDisplayed={5}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProfileList;
