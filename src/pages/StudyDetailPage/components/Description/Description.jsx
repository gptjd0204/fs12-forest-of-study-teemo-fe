import styles from './Description.module.css';
import TotalPoint from '../../../../components/TotalPoint/TotalPoint';
import { useParams } from 'react-router-dom';
import DescSkeleton from '../../../../components/Loading/DescSkeleton';
import TotalPointSkeleton from '../../../../components/Loading/TotalPointSkeleton';
import { useEffect } from 'react';

const Description = ({
  descTitle,
  descContent,
  descType = 'text',
  isLoading,
  points,
}) => {
  const { id } = useParams();

  return (
    <div className={styles.descContainer}>
      <p className={styles.descTitle}>{descTitle}</p>
      {descType === 'text' &&
        (isLoading ? (
          <DescSkeleton />
        ) : (
          <p className={styles.descContent}>{descContent}</p>
        ))}
      {descType === 'point' &&
        (isLoading ? (
          <TotalPointSkeleton isTitleOn={true} />
        ) : (
          <TotalPoint size={'m'} points={points} />
        ))}
    </div>
  );
};

export default Description;
