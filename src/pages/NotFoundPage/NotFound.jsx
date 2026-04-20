import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={`wrapper ${styles.notFoundWrapper}`}>
      <div className={styles.notFoundContainer}>
        <div className={styles.content}>
          <h1 className={styles.errCode}>404</h1>
          <h2>페이지를 찾을 수 없습니다..</h2>
          <p>요청하신 페이지가 존재하지 않거나 이동되었습니다</p>
        </div>

        <Link to="/" className={`btn ${styles.homeBtn}`}>
          홈으로
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
