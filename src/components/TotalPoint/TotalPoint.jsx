import styles from './TotalPoint.module.css';
import icPoint from '../../assets/icons/ic_point.svg';
import { useEffect, useState } from 'react';
import { getTotalPoint } from '../../services/PointService';

/* ----------------------------------
            총합 포인트 컴포넌트
  -----------------------------------

  id = 각 Study의 ID 
  size = TotalPoint의 크기 (m, default는 s)
  theme = TotalPoint의 테마 (dark, default는 white)
  isIndividual = TotalPoint 컴포넌트를 각자 사용하고자 할 때 (default는 false)
  points = TotalPoint의 포인트 값(isIndividual true시 사용)

  (ex: <TotalPoint id={ 각 Study의 ID } size={'m'} theme={'dark'} />
       <TotalPoint size={'m'}/> 
       <TotalPoint /> )
*/

const TotalPoint = ({ id, size, theme, isIndividual = false, points = 0 }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotalPoint = async () => {
      const totalPoint = await getTotalPoint(id);
      setTotal(totalPoint);
    };

    !isIndividual && fetchTotalPoint();
  }, [id, total, isIndividual]);

  return (
    <div
      className={`${styles.point} ${size === 'm' ? styles.medium : ''} ${theme === 'dark' ? styles.dark : ''}`}
    >
      <img src={icPoint} alt="총합 포인트 아이콘" />
      <p>{isIndividual ? points : total}P 획득</p>
    </div>
  );
};

export default TotalPoint;
