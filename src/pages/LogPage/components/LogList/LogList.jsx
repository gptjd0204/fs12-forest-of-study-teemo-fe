import styles from './LogList.module.css';
import { formattedTime } from '../../../../utils/formattedTime';
import { formatKST } from "../../../../utils/formattedDate";
import { calculateDailyTotals } from '../../../../utils/logCalculator';

const LogList = ({ logType, pointLogs, focusLogs }) => {

  const logList = logType === "point" ? pointLogs : focusLogs;
  const hasData = logList && logList.length > 0;

  const {point, focus } = calculateDailyTotals(pointLogs, focusLogs);

  return (
    <>
      {/* 총합 */}
      {hasData && (
        <div className={styles.totalBox}>
          <h3 className={styles.logType}>
            {logType === "point" ? "총 획득 포인트" : "총 집중 시간"}
          </h3>

          <h3 className={
            logType === "point" 
              ? styles.totalPointValue 
              : styles.totalFocusValue}
          >
            {logType === "point" 
              ? `${point.toLocaleString()} P` 
              : formattedTime(focus)}
          </h3>
        </div>
      )}

      {/* 리스트 */}
        <div className={styles.list}>
          {hasData ? (
          logList.map((item) => (
            <div 
              key={item.id || item.createdAt} 
              className={styles.row}
            >
              <span 
              className={styles.rowDate}>
                {formatKST(item.createdAt)} 
              </span>
              <span className={styles.rowValue}>
                {logType === "point" ? `${item.points} P` 
                : formattedTime(item.focusDuration)}
              </span>
            </div>
          ))
        ) : (
          <p className={styles.noData}>해당 날짜의 기록이 없어요.</p>
        )}
        </div>
    </>
  );
};

export default LogList;