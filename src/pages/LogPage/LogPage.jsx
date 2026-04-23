import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./LogPage.module.css";
import LogHeader from './components/LogHeader/LogHeader';
import LogDateSelector from './components/LogDateSelector/LogDateSelector';
import LogList from './components/LogList/LogList';
import { getLogs } from '../../services/LogService';
import { formatDate } from '../../utils/formattedDate';
import { getStudyDetail } from '../../services/StudyService';
import Pagenation from '../../components/Pagination/Pagination';


const LogPage = () => {
  const { id } = useParams();
  const [study, setStudy] = useState([]);
  const [logType, setLogType] = useState("focus");
  const [date, setDate] = useState(new Date());

  const [totalStats, setTotalStats] = useState({
    totalPoint: 0,
    totalFocus: 0
  });

  const [pointLogs, setPointLogs] = useState([]);
  const [focusLogs, setFocusLogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
  });
  
  const [isStudyLoading, setIsStudyLoading] = useState(true);
  const [isLogsLoading, setIsLogsLoading] = useState(true);

  const pageChangeHandler = (page) => {
    if (page < 1 || page > pagination.totalPages || page === currentPage) {
      return;
    }
    setCurrentPage(page);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [date, logType]);

  useEffect(() => {
      const fetchStudyData = async () => {
        setIsStudyLoading(true);
        const studyData = await getStudyDetail(id);
        setStudy(studyData.study);
        setIsStudyLoading(false);
      };
      fetchStudyData();
    }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLogsLoading(true);
      const formattedDate = formatDate(date);
      const result = await getLogs(id, formattedDate, currentPage);

      if (result.success) {
        setPointLogs(result.data.logs);
        setFocusLogs(result.data.logs);
        setPagination(result.data.pagination);

        if (result.data.totalStats) {
          setTotalStats(result.data.totalStats);
        }
      }
      setIsLogsLoading(false);
    };
    fetchData();
  }, [date, id, currentPage]);


  return (
    // 페이지 전체 컨테이너
    <div className="wrapper">

      {/** 헤더 */}
      <LogHeader 
        id={id}
        study={study}
        logType={logType}
        setLogType={setLogType}
        isLoading={isStudyLoading}
      />

      <div className={styles.logWrapper}>
        <LogDateSelector 
          date={date}
          setDate={setDate}
          formatDate={formatDate}
        />

        {/** 로그 리스트 */}
        <LogList 
          key={`${id}-${logType}-${date}`}
          logType={logType}
          pointLogs={pointLogs}
          focusLogs={focusLogs}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pageChangeHandler}
          totalStats={totalStats}
          isLoading={isLogsLoading}
        />
      </div>
    </div>
  );
};

export default LogPage;
