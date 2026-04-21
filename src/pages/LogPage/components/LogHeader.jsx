import styles from "../LogPage.module.css";
import LinkButton from '../../../components/LinkButton/LinkButton';
import CurrentTime from '../../../components/CurrentTime/CurrentTime';

const LogHeader = ({ id, study, logType, setLogType }) => {
  const { nickname, title } = study || {};

  return (
    <div className={styles.topwrapper}>
        {/** 스터디이름, 링크 */}
        <div className={styles.top}>
          <h1>
            {nickname}의 {title}
          </h1>
          <div className={styles.linkContainer}>
            <LinkButton  
              className={styles.linkButton}
              text="스터디" 
              url={`/${id}/detail`}
            />
            <LinkButton 
              className={styles.linkButton}
              text="홈" 
              url="/"
            />
          </div>
        </div>
        
        <div className={styles.dateWrapper}>
        {/** 시간, 라디오버튼 */}
          <div className={styles.timeContainer}>
            <CurrentTime />
          </div>

          {/* 라디오 */}
          <div className={styles.radioBox}>
            <label 
              className={`${styles.radioBoxItem} ${
                logType === "focus" ? styles.active : ""
              }`}>
              <input
                type="radio"
                value="focus"
                checked={logType === "focus"}
                onChange={(e) => setLogType(e.target.value)}
              />
              집중 시간
            </label>
            <label className={`${styles.radioBoxItem} ${
              logType === "point" ? styles.active : ""
            }`}>
              <input 
                type="radio"
                value="point"
                checked={logType === "point"}
                onChange={(e) => setLogType(e.target.value)}
              />
              포인트
            </label>
          </div>       
        </div>
      </div>
  );
};

export default LogHeader;