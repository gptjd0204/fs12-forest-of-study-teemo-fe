import styles from './Description.module.css';
import TotalPoint from '../../../../components/TotalPoint/TotalPoint';
import { useParams } from 'react-router-dom';

const Description = ({ descTitle, descContent, descType = 'text' }) => {
  const { id } = useParams();

  return (
    <div className={styles.descContainer}>
      <p className={styles.descTitle}>{descTitle}</p>
      {descType === 'text' ? (
        <p className={styles.descContent}>{descContent}</p>
      ) : (
        <TotalPoint id={id} size={'m'} />
      )}
    </div>
  );
};

export default Description;
