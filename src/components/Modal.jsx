import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, message, buttonText, onConfirm }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.modalText}>{message}</p>
        <button className={styles.modalButton} onClick={onConfirm}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
