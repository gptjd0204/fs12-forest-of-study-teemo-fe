import styles from './Pagination.module.css';

const PAGE_GROUP_SIZE = 5;

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 0) {
    return null;
  }

  // 예를 들어 totalPages = 5 [1, 2, 3, 4, 5]
  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <nav className={styles.pagination} aria-label="페이지네이션">
      <button
        type="button"
        className={`${styles.button} ${styles.pageButton}`}
        aria-label="첫 페이지"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.pageButton}`}
        aria-label="이전 페이지"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      <div className={styles.pageNumbers}>
        {pages.map((page) => {
          //현재 페이지 번호인 버튼에만 active 표시
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              className={`${styles.button} ${styles.pageButton} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={`${styles.button} ${styles.pageButton}`}
        aria-label="다음 페이지"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.pageButton}`}
        aria-label="마지막 페이지"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </nav>
  );
};

export default Pagination;
