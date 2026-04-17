import React from 'react';
import styles from '../../pages/TodayHabitPage/TodayHabitPage.module.css';

const HabitList = ({ habits, onToggleHabit }) => {
  return (
    <>
      <div className={styles.habitList}>
        {habits.length === 0 ? (
          <div className={styles.emptyMessage}>
            <p>아직 습관이 없어요</p>
            <p>목록 수정을 눌러 습관을 생성해보세요</p>
          </div>
        ) : (
          habits.map((h) => (
            <div
              key={h.id}
              onClick={() => onToggleHabit(h.id)}
              className={`${styles.habitItem} ${h.isCompleted ? styles.completed : styles.notComplete}`}
            >
              {h.name}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HabitList;
