import styles from './TotalPoints.module.css';
import TotalPoint from '../../../../components/TotalPoint/TotalPoint';

const TotalPoints = ({ points }) => {
  return (
    <div className={styles.pointContainer}>
      <p>현재까지 획득한 포인트</p>
      <TotalPoint size={'m'} points={points} />
    </div>
  );
};

export default TotalPoints;
