import styles from './LogList.module.css';
import { formattedTime } from '../../../../utils/formattedTime';
import { formatKST } from "../../../../utils/formattedDate";
import { calculateDailyTotals } from '../../../../utils/logCalculator';
import Pagination from '../../../../components/Pagination/Pagination';

const LogList = ({ 
  logType,
  pointLogs,
  focusLogs,
  currentPage,
  totalPages,
  onPageChange
}) => {
  const currentItems = logType === "point" ? pointLogs : focusLogs;
  const hasData = currentItems && currentItems.length > 0;
  
  const { point, focus } = calculateDailyTotals(pointLogs, focusLogs);

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
        <>
          <div className={styles.rowsContainer}>
            {currentItems.map((item) => (
              <div key={item.id} className={styles.row}>
                <span className={styles.rowDate}>{formatKST(item.createdAt)}</span>
                <span className={styles.rowValue}>
                  {logType === "point" ? `${item.points} P` : formattedTime(item.focusDuration)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <p className={styles.noData}>기록이 없어요.</p>
      )}
    </div>
    </>
  );
};

export default LogList;