import React from 'react';
import styles from './CreateModal.module.css';

const CreateModal = ({ children, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackgroundClick}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default CreateModal;
