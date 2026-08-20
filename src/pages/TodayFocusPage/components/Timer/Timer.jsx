import styles from './Timer.module.css';
import icPlay from '../../../../assets/icons/ic_play.svg';
import icPause from '../../../../assets/icons/ic_pause.svg';
import icRestart from '../../../../assets/icons/ic_restart.svg';
import icStop from '../../../../assets/icons/ic_stop.svg';
import { formattedTime } from '../../../../utils/formattedTime';
import { useEffect, useRef, useState } from 'react';
import {
  updateComplete,
  updatePause,
  updateReset,
  updateStart,
} from '../../../../services/TimerService';

const Timer = ({
  studyId,
  timerCount,
  targetDuration,
  toggleForm,
  timerStatus,
  setTimerCount,
  setTimerStatus,
  setTotalPoint,
  addToast,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const timerRef = useRef(null);

  // 타이머 리셋 함수
  const resetTimer = () => {
    setTimerCount(targetDuration);
    setTimerStatus('CANCELED');
  };

  /*--------------------------------
           타이머 시간 렌더링
  -----------------------------------*/
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
            return (prev = 0);
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
      addToast('error', '집중이 중단되었습니다.', 'stop');
      await updatePause(studyId);
      setIsUpdating(false);
    }
  };

  const timerResetHandler = async () => {
    if (!isUpdating) {
      setIsUpdating(true);
      clearInterval(timerRef.current);
      timerRef.current = null;
      resetTimer();
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
      resetTimer();
      addToast('success', `${points}포인트를 획득했습니다!`, 'complete');
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.timerContainer}>
      {timerStatus === 'COMPLETED' ? (
        <h3 className={styles.complete}>-{formattedTime(timerCount)}</h3>
      ) : (
        <h3 className={timerStatus !== 'CANCELED' ? styles.inProgress : ''}>
          {formattedTime(timerCount)}
        </h3>
      )}
      <div className={styles.timerControlContainer}>
        {timerStatus === 'COMPLETED' ? (
          <button
            className={styles.startBtn}
            onClick={timerCompleteHandler}
            disabled={timerStatus === 'IN_PROGRESS'}
          >
            <img src={icStop} />
            Stop
          </button>
        ) : (
          <>
            {timerStatus !== 'CANCELED' && (
              <button
                className={`${styles.pauseBtn} ${styles.ctrlBtn}`}
                onClick={timerPauseHandler}
                disabled={timerStatus === 'PAUSED'}
              >
                <img src={icPause} />
              </button>
            )}
            <button
              className={styles.startBtn}
              onClick={timerStartHandler}
              disabled={timerStatus === 'IN_PROGRESS' || toggleForm === 'FORM'}
            >
              <img src={icPlay} />
              Start!
            </button>
            {timerStatus !== 'CANCELED' && (
              <button
                className={`${styles.restartBtn} ${styles.ctrlBtn}`}
                onClick={timerResetHandler}
              >
                <img src={icRestart} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
