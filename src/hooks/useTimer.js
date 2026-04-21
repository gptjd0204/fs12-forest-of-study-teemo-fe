import { useEffect, useRef, useState } from 'react';
import {
  updateComplete,
  updatePause,
  updateReset,
  updateStart,
} from '../services/TimerService';

/*------------------------------------------
        타이머를 설정하는 커스텀 Hook
-------------------------------------------*/
const useTimer = (
  studyId,
  targetDuration,
  setTargetDuration,
  setTotalPoint,
  timerStatus,
  setTimerStatus,
  timerCount,
  setTimerCount,
) => {
  const [toast, setToast] = useState({ show: false, type: '', msg: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const timerRef = useRef();

  // 타이머 초기화 함수
  const initTimer = () => {
    setTargetDuration(1500000);
    setTimerCount(1500000);
    setTimerStatus('CANCELED');
  };

  // 토스트 메시지 출력
  useEffect(() => {
    setTimeout(() => {
      setToast({ show: false, type: '', msg: '' });
    }, 3000);
  }, [toast]);

  // 타이머 시간 출력
  useEffect(() => {
    if (timerStatus === 'COMPLETED') {
      timerRef.current = setInterval(() => {
        setTimerCount((prev) => prev + 1000);
      }, 1000);
    }
    if (timerStatus === 'IN_PROGRESS') {
      timerRef.current = setInterval(() => {
        setTimerCount((prev) => {
          if (prev - 1000 < 1000) {
            setTimerStatus('COMPLETED');
          }
          return prev - 1000;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [timerStatus, setTimerCount, setTimerStatus]);

  /*-----------------------------------------------------
            타이머 조작 핸들러(시작, 일시정지, 리셋)
    ------------------------------------------------------*/
  const timerStartHandler = async () => {
    setTimerStatus('IN_PROGRESS');
    await updateStart(studyId);
  };

  const timerPauseHandler = async () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimerStatus('PAUSED');
    setToast({ show: true, type: 'error', msg: '집중이 중단되었습니다.' });
    await updatePause(studyId);
  };

  const timerResetHandler = async () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimerStatus('CANCELED');
    setTimerCount(targetDuration);
    await updateReset(studyId);
  };

  const timerCompleteHandler = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      const points = await updateComplete(studyId);
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTotalPoint((prev) => prev + points);
      initTimer();
      setToast({
        show: true,
        type: 'success',
        msg: `${points}포인트를 획득했습니다!`,
      });
      setIsUpdating(false);
    }
  };

  return {
    toast,
    timerStartHandler,
    timerPauseHandler,
    timerResetHandler,
    timerCompleteHandler,
  };
};

export default useTimer;
