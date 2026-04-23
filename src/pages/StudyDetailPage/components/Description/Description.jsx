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

  const pointsHandler = () => {
    if (!points) {
      return;
    }
    const sum = points.map((point) => point.points).reduce((a, b) => a + b, 0);

    return sum;
  };

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
          <TotalPoint
            id={id}
            size={'m'}
            isIndividual={true}
            points={pointsHandler()}
          />
        ))}
    </div>
  );
};

export default Description;
