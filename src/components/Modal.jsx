import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, message, buttonText, onConfirm }) => {
  if (!isOpen) return null; 

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
