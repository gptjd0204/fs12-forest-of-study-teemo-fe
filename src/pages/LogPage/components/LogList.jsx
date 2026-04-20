import styles from "./LogPage.module.css";
import { formattedTime } from '../../../utils/formattedTime';
import { formatDate } from "../../../utils/formattedDate";

const LogList = ({ logType, pointLogs, focusLogs }) => {

  const logList = logType === "point" ? pointLogs : focusLogs;
  const hasData = logList && logList.length > 0;

  const dailyTotal = { point: 0, focus: 0 };

  (pointLogs || []).forEach(log => {
    dailyTotal.point += (log.points || 0);
  });

  (focusLogs || []).forEach(log => {
    dailyTotal.focus += (Number(log.focusDuration) || 0);
  });

  return (
    <>
      {/* 총합 */}
      {hasData && (
        <div className={styles.totalBox}>
          <h3 className={styles.logType}>
            {logType === "point" ? "총 획득 포인트" : "총 집중 시간"}
          </h3>

          {logType === "point" ? (
            <h3 className={styles.totalPointValue}>
              {(dailyTotal.point).toLocaleString()} P
            </h3>
          ) : (
            <h3 className={styles.totalFocusValue}>
              {formattedTime(dailyTotal.focus)}
            </h3>
          )}
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
              {logType === "point" ? (
                <>
                  <span className={styles.rowDate}>
                    {formatDate(item.createdAt)}
                  </span>
                  <span className={styles.rowValue}>
                    {item.points} P
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.rowDate}>
                    {formatDate(item.createdAt)}
                  </span>
                  <span className={styles.rowValue}>
                    {formattedTime(item.focusDuration)}
                  </span>
                </>
              )}
            </div>
          ))
          ) : (
            <>
              <p className={styles.noData}>
                해당 날짜의 기록이 없어요.
              </p>
            </>
          )}
        </div>
    </>
  );
};

export default LogList;