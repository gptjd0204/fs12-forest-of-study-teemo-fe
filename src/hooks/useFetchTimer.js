import { useEffect, useState } from 'react';
import { createTimer, getTimer } from '../services/TimerService';
import { getTotalPoint } from '../services/PointService';

/*------------------------------------------
     타이머 데이터를 받아오는 커스텀 Hook
-------------------------------------------*/
const useFetchTimer = (studyId) => {
  const [targetDuration, setTargetDuration] = useState(0);
  const [timerCount, setTimerCount] = useState(targetDuration);
  const [timerStatus, setTimerStatus] = useState('CANCELED');
  const [totalPoint, setTotalPoint] = useState(0);
  const [title, setTitle] = useState('');
  const [isNotFoundError, setIsNotFoundError] = useState(false);

  // 타이머 초기화 함수
  const initTimer = () => {
    setTargetDuration(1500000);
    setTimerCount(1500000);
    setTimerStatus('CANCELED');
  };

  useEffect(() => {
    try {
      const fetchTimer = async () => {
        const data = await getTimer(studyId);
        if (!data) {
          setIsNotFoundError(true);
          return;
        }
        const timer = data.timer;
        const total = await getTotalPoint(studyId);

        setTitle(`${data.nickname}의 ${data.title}`);
        if (!timer) {
          initTimer();
          await createTimer(studyId);
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
          const totalElapsedTime = timer.elapsedTime + timeDiff;
          const remainingTime = timer.targetDuration - totalElapsedTime;

          if (remainingTime < 0) {
            setTimerStatus('COMPLETED');
            setTimerCount(totalElapsedTime - timer.targetDuration + 700);
          } else {
            setTimerCount(remainingTime + 700);
          }
        } else {
          setTimerCount(timer.targetDuration - timer.elapsedTime + 700);
        }
      };

      fetchTimer();
    } catch (error) {
      console.error(error);
    }
  }, [studyId]);

  return {
    targetDuration,
    setTargetDuration,
    timerCount,
    setTimerCount,
    timerStatus,
    setTimerStatus,
    totalPoint,
    setTotalPoint,
    title,
    isNotFoundError,
  };
};

export default useFetchTimer;
