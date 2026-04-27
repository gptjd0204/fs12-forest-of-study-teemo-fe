import styles from './TodayFocus.module.css';
import FocusHeader from './components/FocusHeader/FocusHeader';
import TotalPoints from './components/TotalPoints/TotalPoints';
import TargetDuration from './components/TargetDuration/TargetDuration';
import Timer from './components/Timer/Timer';
import { useParams } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import NotFound from '../NotFoundPage/NotFound';
import { useEffect, useState } from 'react';
import ContentSpinner from '../../components/Loading/ContentSpinner';
import StudyNameSkeleton from '../../components/Loading/StudyNameSkeleton';
import TotalPointSkeleton from '../../components/Loading/TotalPointSkeleton';
import { createTimer, getTimer } from '../../services/TimerService';
import { getTotalPoint } from '../../services/PointService';
import useToast from '../../hooks/useToast';

const TodayFocus = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [targetDuration, setTargetDuration] = useState(0);
  const [timerCount, setTimerCount] = useState(0);
  const [timerStatus, setTimerStatus] = useState('CANCELED');
  const [totalPoint, setTotalPoint] = useState(0);
  const [title, setTitle] = useState('');
  const [toggleForm, setToggleForm] = useState('DEFAULT');
  const { addToast, toasts } = useToast();

  // 타이머 초기화 함수
  const initTimer = () => {
    setTargetDuration(1500000);
    setTimerCount(1500000);
    setTimerStatus('CANCELED');
  };

  useEffect(() => {
    try {
      const fetchTodayFocus = async () => {
        const data = await getTimer(id);
        const timer = data.timer;
        const total = await getTotalPoint(id);

        setTitle(`${data.nickname}의 ${data.title}`);
        if (!timer) {
          initTimer();
          setIsLoading(false);
          await createTimer(id);
          return;
        }

        setTotalPoint(total);
        setTargetDuration(timer.targetDuration);
        setTimerStatus(timer.status);
        // 타이머 남은 시간 계산 로직
        if (timer.status === 'IN_PROGRESS') {
          const now = Date.now();
          const lastStartedAt = new Date(timer.lastStartedAt);

          const timeDiff = now - lastStartedAt;
          if (timeDiff < 0) {
            setTimerCount(timer.targetDuration - timer.elapsedTime + 700);
            return;
          }
          const totalElapsedTime = timer.elapsedTime + timeDiff;
          const remainingTime = timer.targetDuration - totalElapsedTime;

          if (remainingTime < 0) {
            setTimerStatus('COMPLETED');
            setTimerCount(totalElapsedTime - timer.targetDuration + 700);
          } else {
            setTimerCount(remainingTime);
          }
        } else {
          setTimerCount(timer.targetDuration - timer.elapsedTime + 700);
        }

        setIsLoading(false);
      };

      fetchTodayFocus();
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return (
    <>
      <div className={`wrapper ${styles.wrapper}`}>
        <div className={styles.focusWrapper}>
          <div>
            {isLoading ? (
              <>
                <StudyNameSkeleton />
                <TotalPointSkeleton />
              </>
            ) : (
              <>
                <FocusHeader studyId={id} title={title} />
                <TotalPoints points={totalPoint} />
              </>
            )}
          </div>
          <main className={styles.timerWrapper}>
            {isLoading ? (
              <div className={styles.spinnerContainer}>
                <ContentSpinner />
              </div>
            ) : (
              <>
                <div className={styles.timerHeader}>
                  <h2>오늘의 집중</h2>
                  <TargetDuration
                    studyId={id}
                    toggleForm={toggleForm}
                    setToggleForm={setToggleForm}
                    targetDuration={targetDuration}
                    setTargetDuration={setTargetDuration}
                    timerStatus={timerStatus}
                    setTimerCount={setTimerCount}
                  />
                </div>
                <Timer
                  studyId={id}
                  toggleForm={toggleForm}
                  targetDuration={targetDuration}
                  timerCount={timerCount}
                  setTimerCount={setTimerCount}
                  timerStatus={timerStatus}
                  setTimerStatus={setTimerStatus}
                  setTotalPoint={setTotalPoint}
                  addToast={addToast}
                />
              </>
            )}
          </main>
        </div>
      </div>
      {toasts.length > 0 &&
        toasts.map((t) => {
          return <Toast key={t.id} toastType={t.type} toastMsg={t.msg} />;
        })}
    </>
  );
};

export default TodayFocus;
