import React from 'react';
import styles from '../../pages/TodayHabitPage/TodayHabitPage.module.css';
import LinkButton from '../../components/LinkButton/LinkButton';

const HabitHeader = ({ studyName, id }) => {
  return (
    <>
      <div className={styles.top}>
        <h1 className={styles.title}>{studyName}</h1>
        <nav className={styles.navContainer}>
          <LinkButton text="오늘의 집중" url={`/${id}/focus`} />
          <LinkButton text="로그" url={`/${id}/logs`} />
          <LinkButton text="홈" url={`/${id}/detail`} />
        </nav>
      </div>
    </>
  );
};

export default HabitHeader;
