import React from "react";
import styles from "./UserJobPage.module.css";
import JobList from "../components/JobList.jsx";

function UserJobPage() {
  return(
    <div className={styles.pageContainer}>
      <JobList />
    </div>
  );
};

export default UserJobPage; 