import styles from './Pagination.module.css';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 0) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination} aria-label="페이지네이션">
      <button
        type="button"
        className={styles.navButton}
        aria-label="첫 페이지"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        type="button"
        className={styles.navButton}
        aria-label="이전 페이지"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      <div className={styles.pageNumbers}>
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
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
        className={styles.navButton}
        aria-label="다음 페이지"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        type="button"
        className={styles.navButton}
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
