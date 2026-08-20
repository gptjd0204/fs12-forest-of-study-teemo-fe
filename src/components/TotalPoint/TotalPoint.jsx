import styles from './TotalPoint.module.css';
import icPoint from '../../assets/icons/ic_point.svg';

/* ----------------------------------
            총합 포인트 컴포넌트
  -----------------------------------

  size = TotalPoint의 크기 (m, default는 s)
  theme = TotalPoint의 테마 (dark, default는 white)
  points = TotalPoint의 포인트 값

  (ex: <TotalPoint size={'m'} theme={'dark'} points={총합 포인트} />
       <TotalPoint size={'m'} points={총합 포인트} /> 
       <TotalPoint points={총합 포인트} /> )
*/

const TotalPoint = ({ size, theme, points = 0 }) => {
  return (
    <div
      className={`${styles.point} ${size === 'm' ? styles.medium : ''} ${theme === 'dark' ? styles.dark : ''}`}
    >
      <img src={icPoint} alt="총합 포인트 아이콘" />
      <p>{points}P 획득</p>
    </div>
  );
};

export default TotalPoint;
