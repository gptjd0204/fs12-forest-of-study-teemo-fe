import React from 'react';
import styles from '../TodayHabitPage.module.css';
import LinkButton from '../../../components/LinkButton/LinkButton';
import StudyNameSkeleton from '../../../components/Loading/StudyNameSkeleton';

const HabitHeader = ({ studyUser, studyName, id, isLoading }) => {
  return (
    <>
      <div className={styles.top}>
        {isLoading ? (
          <StudyNameSkeleton />
        ) : (
          <>
            <h1 className={styles.title}>
              {studyUser}의 {studyName}
            </h1>
            <nav className={styles.navContainer}>
              <LinkButton text="오늘의 집중" url={`/${id}/focus`} />
              <LinkButton text="로그" url={`/${id}/logs`} />
              <LinkButton text="홈" url={`/${id}/detail`} />
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default HabitHeader;
