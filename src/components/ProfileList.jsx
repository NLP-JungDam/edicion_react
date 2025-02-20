import React, { useState, useEffect } from "react";
import styles from "./ProfileList.module.css";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import applicants from "../dummy/applicants.js"; // 더미 데이터

function ProfileList({ selectedTalent }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [filteredApplicants, setFilteredApplicants] = useState(applicants);

  // 선택된 Talent(인재상)에 따라 필터링
  useEffect(() => {
    if (selectedTalent) {
      setFilteredApplicants(applicants.filter((applicant) => applicant.talent === selectedTalent));
    } else {
      setFilteredApplicants(applicants);
    }
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
  }, [selectedTalent]);

  const pageCount = Math.ceil(filteredApplicants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {filteredApplicants
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((applicant) => (
            <div key={applicant.id} className={styles.card}>
              <div className={styles.header}>
                <h3 className={styles.name}>{applicant.name}</h3>
                <p className={styles.score}>{applicant.score}%</p>
              </div>
              <div className={styles.details}>
                <p>{applicant.birthdate}</p>
                <p>{applicant.phone}</p>
                <p>{applicant.email}</p>
                <p>{applicant.location}</p>
                <p>선호 직무: {applicant.preferredJob}</p>
                <p>자격증: {applicant.certificates}</p>
                <p>경력: {applicant.experience}</p>
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
    </div>
  );
}

export default ProfileList;
