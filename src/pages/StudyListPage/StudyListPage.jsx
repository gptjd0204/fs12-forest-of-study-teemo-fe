import { useEffect, useState } from 'react';
import Card from './StudyComponents/Card';
import Pagination from '../../components/Pagination/Pagination';
import Search from './StudyComponents/Search';
import Sort from './StudyComponents/Sort';
import { getRecentStudyList, getStudyList } from '../../services/StudyService';
import styles from './StudyListPage.module.css';

const PAGE_SIZE = 6;

const StudyList = () => {
  const [studyList, setStudyList] = useState([]);
  const [recentStudyList, setRecentStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    totalCount: 0,
    totalPages: 1,
  });

  // 세션스토리지에 저장된 비밀번호 인증 초기화
  sessionStorage.clear();

  useEffect(() => {
    const fetchStudyList = async () => {
      setIsLoading(true);

      try {
        const result = await getStudyList({
          page: currentPage,
          pageSize: PAGE_SIZE,
          keyword,
          orderBy,
        });
        const recentStudies = getRecentStudyList();

        setStudyList(result.studies);
        setPagination(
          result.pagination ?? {
            pageSize: PAGE_SIZE,
            totalCount: result.studies.length,
            totalPages: 1,
          },
        );
        setRecentStudyList(recentStudies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudyList();
  }, [currentPage, keyword, orderBy]);

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
  };

  const handleSearchSubmit = (value) => {
    setKeyword(value.trim());
    setCurrentPage(1);
  };

  const handleSortChange = (nextOrderBy) => {
    setOrderBy(nextOrderBy);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  return (
    <main className={styles.page}>
      <div className="wrapper">
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>
          <div className={styles.recentGrid}>
            {recentStudyList.length === 0 ? (
              <h2>아직 조회한 스터디가 없어요.</h2>
            ) : (
              recentStudyList.map((study) => (
                <Card key={study.id} study={study} />
              ))
            )}
          </div>
        </section>
      </div>

      <div className={`wrapper ${styles.browseWrapper}`}>
        <section className={`${styles.section} ${styles.browseSection}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>
          </div>

          <div className={styles.controlsRow}>
            <Search
              value={searchKeyword}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
            />
            <Sort value={orderBy} onChange={handleSortChange} />
          </div>

          <div className={styles.cardGrid}>
            {isLoading ? (
              <div className={styles.loadingState}>
                <div className={styles.loadingBadge}>
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                  <span className={styles.loadingDot} />
                </div>
                <h2 className={styles.loadingText}>
                  스터디 목록을 불러오는 중입니다.
                </h2>
              </div>
            ) : studyList.length === 0 ? (
              <h2>
                {keyword
                  ? '검색 결과가 존재하지 않습니다.'
                  : '아직 둘러볼 스터디가 없어요.'}
              </h2>
            ) : (
              studyList.map((study) => <Card key={study.id} study={study} />)
            )}
          </div>

          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default StudyList;
