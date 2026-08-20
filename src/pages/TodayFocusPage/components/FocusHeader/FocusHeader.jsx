import styles from './FocusHeader.module.css';
import LinkButton from '../../../../components/LinkButton/LinkButton';

const FocusHeader = ({ studyId, title }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <nav className={styles.navContainer}>
        <LinkButton text="오늘의 습관" url={`/${studyId}/habit`} />
        <LinkButton text="로그" url={`/${studyId}/logs`} />
        <LinkButton text="홈" url={`/${studyId}/detail`} />
      </nav>
    </header>
  );
};

export default FocusHeader;
