import { useState } from 'react';
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

  const totalPages = Math.ceil((logList?.length || 0) / pageItems);

  const startPageNumber = (currentPage - 1) * pageItems;
  const currentItems = logList?.slice(startPageNumber, startPageNumber + pageItems);

  const startPageBlock = Math.floor((currentPage -1) / pageLimit) * pageLimit + 1;
  const endPageBlock = Math.min(startPageBlock + pageLimit -1, totalPages);

  // 페이지 이동 핸들러
  const goToFirstHandler = () => {
    setCurrentPage(1);
    return;
  }

  const goToLastHandler = () => {
    setCurrentPage(totalPages);
  };

  const gotoPrevHandler = () => {
    setCurrentPage((prev) => {
      const prevPage = Math.max(1, prev -1);
      return prevPage;
    });
    return;
  }

  const goToNextHandler = () => {
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
            </>
          ) : (
            <p className={styles.noData}>해당 날짜의 기록이 없어요.</p>
          )}

          {hasData && (
            <div className={styles.pagination}>
                <button
                  onClick={goToFirstHandler}
                  disabled={currentPage === 1}
                  >{"<<"} </button>
                <button
                  onClick={gotoPrevHandler}
                  disabled={currentPage === 1}
                  >{"<"}</button>

              {[...Array(endPageBlock - startPageBlock + 1)].map((_, index) => {
                const pageNumber = startPageBlock + index;
                return (
                  <button
                  key={pageNumber}
                  onClick={() => {
                    setCurrentPage(pageNumber)
                  }}
                  className={currentPage === pageNumber ? styles.activePage : ""}
                  >{pageNumber}</button>
                );
              })}

              {/** 다음 페이지 */}
              <button
                onClick={goToNextHandler}
                disabled={currentPage === totalPages}
                >{">"}</button>
              {/** 맨 끝 페이지 */}
              <button
                onClick={goToLastHandler}
                disabled={currentPage === totalPages}
                > {">>"}</button>
            </div>
          )}
        </div>
    </>
  );
};

export default LogList;