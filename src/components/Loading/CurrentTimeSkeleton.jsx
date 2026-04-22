import React from 'react';
import styles from './Loading.module.css';

const CurrentTimeSkeleton = () => {
  return (
    <div className={styles.currentTimeSkeletonContainer}>
      <div className={styles.currentTimeTitleSkeleton}></div>
      <div className={styles.currentTimeSkeleton}></div>
    </div>
  );
};

export default CurrentTimeSkeleton;
