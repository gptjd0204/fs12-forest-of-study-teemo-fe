import styles from './Loading.module.css';

const TotalPointSkeleton = ({ isTitleOn = false }) => {
  return (
    <div className={styles.totalPointSkeletonContainer}>
      <div
        className={
          isTitleOn
            ? styles.totalPointTitleNone
            : styles.totalPointTitleSkeleton
        }
      ></div>
      <div className={styles.totalPointSkeleton}></div>
    </div>
  );
};

export default TotalPointSkeleton;
