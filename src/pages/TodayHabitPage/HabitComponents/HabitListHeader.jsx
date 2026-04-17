import React from 'react';
import styles from '../../pages/TodayHabitPage/TodayHabitPage.module.css';

const HabitListHeader = ({ onOpenModal }) => {
  return (
    <>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>오늘의 습관</h2>
        <button className={styles.listConfirm} onClick={onOpenModal}>
          목록 수정
        </button>
      </div>
    </>
  );
};

export default HabitListHeader;
