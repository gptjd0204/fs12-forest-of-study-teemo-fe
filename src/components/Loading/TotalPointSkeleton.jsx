import React from 'react';
import styles from './Loading.module.css';

const TotalPointSkeleton = () => {
  return (
    <div className={styles.totalPointSkeletonContainer}>
      <div className={styles.totalPointTitleSkeleton}></div>
      <div className={styles.totalPointSkeleton}></div>
    </div>
  );
};

export default TotalPointSkeleton;
