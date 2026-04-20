import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./LogPage.module.css";
import LogHeader from './LogHeader';
import LogDateSelector from './LogDateSelector';
import LogList from './LogList';
import { getLogs } from '../../services/LogService';
import { formatDate } from '../../utils/formattedDate';


const Logs = () => {
  const { studyId } = useParams();
  const [logType, setLogType] = useState("focus");
  const [date, setDate] = useState(new Date());
  const [pointLogs, setPointLogs] = useState([]);
  const [focusLogs, setFocusLogs] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = formatDate(date);
        const data = await getLogs(studyId, formattedDate);

        setPointLogs(data);
        setFocusLogs(data);
      } 

    fetchData();
  }, [date, studyId]);


  return (
    // 페이지 전체 컨테이너
    <div className="wrapper">
      <LogHeader 
        studyId={studyId}
        logType={logType}
        setLogType={setLogType}
      />
      <div className={styles.logWrapper}>
        <LogDateSelector 
          date={date}
          setDate={setDate}
          formatDate={formatDate}
        />
        <LogList 
          logType={logType}
          pointLogs={pointLogs}
          focusLogs={focusLogs}
        />
      </div>
      
    </div>
  );
};

export default Logs;
