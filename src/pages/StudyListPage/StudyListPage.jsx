import { useEffect, useState } from 'react';
import Card from './StudyComponents/Card';
import Pagination from './StudyComponents/Pagination';
import Search from './StudyComponents/Search';
import Sort from './StudyComponents/Sort';
import { getRecentStudyList, getStudyList } from '../../services/StudyService';
import styles from './StudyListPage.module.css';

const PAGE_SIZE = 6;

const StudyList = () => {
  const [studyList, setStudyList] = useState([]);
  const [recentStudyList, setRecentStudyList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: PAGE_SIZE,
    totalCount: 0,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchStudyList = async () => {
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
            currentPage,
            pageSize: PAGE_SIZE,
            totalCount: result.studies.length,
            totalPages: 1,
          },
        );
        setRecentStudyList(recentStudies);
      } catch (error) {
        console.error(error);
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
              <h2>아직 조회한 스터디가 없어요</h2>
            ) : (
              recentStudyList.map((study) => (
                <Card key={study.id} study={study} />
              ))
            )}
          </div>
        </section>
      </div>

      <div className="wrapper">
        <section className={styles.section}>
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
            {studyList.length === 0 ? (
              <h2>조건에 맞는 스터디가 없어요</h2>
            ) : (
              studyList.map((study) => <Card key={study.id} study={study} />)
            )}
          </div>

          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={pagination.currentPage}
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
