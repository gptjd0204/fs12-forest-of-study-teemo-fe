import styles from './Description.module.css';
import TotalPoint from '../../../../components/TotalPoint/TotalPoint';
import { useParams } from 'react-router-dom';
import DescSkeleton from '../../../../components/Loading/DescSkeleton';

const Description = ({
  descTitle,
  descContent,
  descType = 'text',
  isLoading,
}) => {
  const { id } = useParams();

  return (
    <div className={styles.descContainer}>
      <p className={styles.descTitle}>{descTitle}</p>
      {descType === 'text' ? (
        isLoading ? (
          <p className={styles.descContent}>{descContent}</p>
        ) : (
          <DescSkeleton />
        )
      ) : (
        <TotalPoint id={id} size={'m'} />
      )}
    </div>
  );
};

export default Description;
