import styles from './Loading.module.css';

const DescSkeleton = () => {
  return (
    <>
      <div className={styles.descSkeleton}></div>
      <div className={styles.descSkeleton}></div>
    </>
  );
};

export default DescSkeleton;
