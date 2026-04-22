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
  const [isUpdating, setIsUpdating] = useState(false);
  const timerRef = useRef(null);
  const [toasts, setToasts] = useState([]);

  // 타이머 초기화 함수
  const initTimer = () => {
    setTimerCount(targetDuration);
    setTimerStatus('CANCELED');
  };

  // 토스트 메시지 추가
  const addToast = (type, msg) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, type, msg }]);

    // 3초 뒤 해당 ID의 토스트만 삭제
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

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
    if (!isUpdating) {
      setIsUpdating(true);
      setTimerStatus('IN_PROGRESS');
      await updateStart(studyId);
      setIsUpdating(false);
    }
  };

  const timerPauseHandler = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimerStatus('PAUSED');
      addToast('error', '집중이 중단되었습니다.');
      await updatePause(studyId);
      setIsUpdating(false);
    }
  };

  const timerResetHandler = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      clearInterval(timerRef.current);
      timerRef.current = null;
      initTimer();
      await updateReset(studyId);
      setIsUpdating(false);
    }
  };

  const timerCompleteHandler = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      const points = await updateComplete(studyId);
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTotalPoint((prev) => prev + points);
      initTimer();
      addToast('success', `${points}포인트를 획득했습니다!`);
      setIsUpdating(false);
    }
  };

  return {
    toasts,
    timerStartHandler,
    timerPauseHandler,
    timerResetHandler,
    timerCompleteHandler,
  };
};

export default useTimer;
