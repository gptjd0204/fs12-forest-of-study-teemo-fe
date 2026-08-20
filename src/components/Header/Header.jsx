import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/img_logo.png';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();

  const isCreateBtn = ['/', '/create'].includes(location.pathname);

  return (
    <header className={styles.headerWrapper}>
      <nav className={styles.gnbContainer}>
        <Link to="/">
          <img src={logo} alt="공부의 숲" className={styles.logo} />
        </Link>
        {isCreateBtn && (
          <Link to="/create" className={`btn ${styles.createBtn}`}>
            스터디 만들기
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
