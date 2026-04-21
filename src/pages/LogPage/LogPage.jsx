import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./LogPage.module.css";
import LogHeader from './components/LogHeader';
import LogDateSelector from './components/LogDateSelector';
import LogList from './components/LogList';
import { getLogs } from '../../services/LogService';
import { formatDate } from '../../utils/formattedDate';
import { getStudyDetail } from '../../services/StudyService';


const LogPage = () => {
  const { id } = useParams();
  const [study, setStudy] = useState([]);
  const [logType, setLogType] = useState("focus");
  const [date, setDate] = useState(new Date());
  const [pointLogs, setPointLogs] = useState([]);
  const [focusLogs, setFocusLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = formatDate(date);
        const data = await getLogs(id, formattedDate);

        setPointLogs(data);
        setFocusLogs(data);

        const studyData = await getStudyDetail(id);
        setStudy(studyData);
      } 

    fetchData();
  }, [date, id]);


  return (
    // 페이지 전체 컨테이너
    <div className="wrapper">

      {/** 헤더 */}
      <LogHeader 
        id={id}
        study={study}
        logType={logType}
        setLogType={setLogType}
      />

      {/** 현재 시간, 라디오버튼 */}
      <div className={styles.logWrapper}>
        <LogDateSelector 
          date={date}
          setDate={setDate}
          formatDate={formatDate}
        />

        {/** 로그 리스트 */}
        <LogList 
          logType={logType}
          pointLogs={pointLogs}
          focusLogs={focusLogs}
        />
      </div>
    </div>
  );
};

export default LogPage;
