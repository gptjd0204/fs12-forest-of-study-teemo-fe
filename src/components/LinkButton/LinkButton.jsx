import { Link } from 'react-router-dom';
import icArrowRight from '../../assets/icons/ic_arrow_right.svg';
import styles from './LinkButton.module.css';

/* ----------------------------------
            링크 버튼 컴포넌트
  -----------------------------------

  text = LinkButton 내부에 들어갈 text
  url = LinkButton 클릭 시, 이동할 url

  type = navigate를 쓰는 button 인지 아닌지 ('button')
  onClick = navigate로 링크 이동을 해야하는 경우

  (ex: <LinkButton text="오늘의 집중" url="/:id/focus" />)
*/
const LinkButton = ({ text, url, type, onClick }) => {
  const content = (
    <>
      <p>{text}</p>
      <img src={icArrowRight} alt="링크 이동" />
    </>
  );

  return (
    <>
      {type === 'button' ? (
        <button className={styles.linkBtn} onClick={onClick}>
          {content}
        </button>
      ) : (
        <Link to={url} className={styles.linkBtn}>
          {content}
        </Link>
      )}
    </>
  );
};

export default LinkButton;
