import styles from "./LogHeader.module.css";
import LinkButton from '../../../../components/LinkButton/LinkButton';
import CurrentTime from '../../../../components/CurrentTime/CurrentTime';

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
            text={<><span>오늘의</span> 습관</> }
            url={`/${id}/habit`}
          />
          <LinkButton  
            className={styles.linkButton}
            text={<><span>오늘의</span> 집중</> } 
            url={`/${id}/focus`}
          />
          <LinkButton 
            className={styles.linkButton}
            text="홈" 
            url={`/${id}/detail`}
          />
        </div>
      </div>
      
      <div className={styles.dateWrapper}>
        {/** 현재 시간 */}
        <div className={styles.timeContainer}>
          <CurrentTime />
        </div>

        {/** 라디오 버튼 */}
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