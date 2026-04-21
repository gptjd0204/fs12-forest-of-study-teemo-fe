import { useState, useEffect } from 'react';
import styles from './LogList.module.css';
import { formattedTime } from '../../../../utils/formattedTime';
import { formatKST } from "../../../../utils/formattedDate";
import { calculateDailyTotals } from '../../../../utils/logCalculator';

const LogList = ({ logType, pointLogs, focusLogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageItems = 5;
  const pageLimit = 5;

  const logList = logType === "point" ? pointLogs : focusLogs;
  const hasData = logList && logList.length > 0;
  const {point, focus } = calculateDailyTotals(pointLogs, focusLogs);

  

  // 페이지네이션 계산
  const totalPages = Math.ceil((logList?.length || 0) / pageItems);

  // 현재 페이지 데이터
  const startPageNumber = (currentPage - 1) * pageItems;
  const currentItems = logList?.slice(startPageNumber, startPageNumber + pageItems);

  // 하단 페이지 번호
  const startPageBlock = Math.floor((currentPage -1) / pageLimit) * pageLimit + 1;
  const endPageBlock = Math.min(startPageBlock + pageLimit -1, totalPages);

  useEffect(() => {
    setCurrentPage(1);
  }, [logType, pointLogs, focusLogs])

  // 페이지 이동 핸들러
  const goToFirst = () => {
    setCurrentPage(1);
    return;
  }

  const goToLast = () => {
    setCurrentPage(totalPages);
  };

  const gotoPrev = () => {
    setCurrentPage((prev) => {
      const prevPage = Math.max(1, prev -1);
      return prevPage;
    })
  }

  const goToNext = () => {
    setCurrentPage((prev) => {
    const nextPage = Math.min(totalPages, prev + 1);
    return nextPage;
    });
    return;
  }

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
              {currentItems.map((item) => (
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
              ))}

              <div className={styles.pagination}>
                {/** 맨 처음 페이지 */}
                <button
                  onClick={goToFirst}
                  disabled={currentPage === 1}
                  >{"<<"} </button>
                  {/** 이전 페이지 */}
                <button
                  onClick={gotoPrev}
                  disabled={currentPage === 1}
                  >{"<"}</button>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  >{">"}</button>
                <button
                  onClick={goToLast}
                  disabled={currentPage === totalPages}
                  > {">>"}</button>
                

              </div>
            </>
        ) : (
          <p className={styles.noData}>해당 날짜의 기록이 없어요.</p>
        )}
        </div>
    </>
  );
};

export default LogList;