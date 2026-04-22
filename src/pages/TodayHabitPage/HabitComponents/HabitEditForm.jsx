import React, { useState } from 'react';
import styles from '../TodayHabitPage.module.css';

const HabitEditForm = ({
  editHabits,
  setEditHabits,
  onAddHabit,
  onRemoveHabit,
  errorInfos,
  setErrorInfos,
}) => {
  const changeHabitHandler = (id, value, index) => {
    setEditHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: value } : h)),
    );

    setErrorInfos((prev) => prev.filter((error) => error.index !== index));
  };

  return (
    <>
      <div className={styles.modifyList}>
        <div className={styles.modifyItemWrap}>
          {editHabits.map((h, index) => {
            const error = errorInfos.find((e) => e.index === index);
            return (
              <div key={h.id} className={styles.modifyItemDelBtn}>
                <div className={styles.modifyItem}>
                  <input
                    value={h.name}
                    onChange={(e) =>
                      changeHabitHandler(h.id, e.target.value, index)
                    }
                    className={`${styles.habitInput} ${error ? styles.error : ''}`}
                  />
                  {error && (
                    <p className={styles.errorMessage}>{error.message}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveHabit(h)}
                  className={styles.removeBtn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.79 7C18.3537 7 18 7.35369 18 7.79V16.63C18 18.4912 16.4912 20 14.63 20H8.95C7.0888 20 5.58 18.4912 5.58 16.63V7.79C5.58 7.35369 5.22631 7 4.79 7C4.3537 7 4 7.35369 4 7.79V16.63C4.02742 19.3719 6.25799 21.5801 9 21.58H14.68C17.4025 21.5529 19.6029 19.3525 19.63 16.63V7.79C19.6304 7.57152 19.5404 7.36262 19.3812 7.21294C19.2221 7.06326 19.008 6.98617 18.79 7Z"
                      fill="#F50E0E"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.79 5.58H4.79C4.3537 5.58 4 5.22631 4 4.79C4 4.35369 4.3537 4 4.79 4H7.44L8.62 2.72C9.07107 2.26141 9.68675 2.00218 10.33 2H13.25C13.8839 1.99999 14.4918 2.25179 14.94 2.7L16.14 4H18.79C19.2263 4 19.58 4.35369 19.58 4.79C19.58 5.22631 19.2263 5.58 18.79 5.58ZM13.25 3.58H10.33C10.1301 3.58007 9.93744 3.65499 9.79 3.79L9.6 3.99H13.98L13.79 3.79C13.6436 3.65326 13.4503 3.57807 13.25 3.58Z"
                      fill="#F50E0E"
                    />
                    <path
                      d="M8.04 8.79V11.79C8.04 12.2042 8.37579 12.54 8.79 12.54C9.20421 12.54 9.54 12.2042 9.54 11.79V8.79C9.54 8.37579 9.20421 8.04 8.79 8.04C8.37579 8.04 8.04 8.37579 8.04 8.79Z"
                      fill="#F50E0E"
                    />
                    <path
                      d="M11.04 8.79V16.79C11.04 17.2042 11.3758 17.54 11.79 17.54C12.2042 17.54 12.54 17.2042 12.54 16.79V8.79C12.54 8.37579 12.2042 8.04 11.79 8.04C11.3758 8.04 11.04 8.37579 11.04 8.79Z"
                      fill="#F50E0E"
                    />
                    <path
                      d="M14.04 8.79V11.79C14.04 12.2042 14.3758 12.54 14.79 12.54C15.2042 12.54 15.54 12.2042 15.54 11.79V8.79C15.54 8.37579 15.2042 8.04 14.79 8.04C14.3758 8.04 14.04 8.37579 14.04 8.79Z"
                      fill="#F50E0E"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={onAddHabit} className={styles.plusBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19"
              stroke="#414141"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M12 19V5"
              stroke="#414141"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HabitEditForm;
