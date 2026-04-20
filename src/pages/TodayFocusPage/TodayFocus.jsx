import styles from './TodayFocus.module.css';
import { useEffect, useRef, useState } from 'react';
import FocusHeader from './components/FocusHeader/FocusHeader';
import TotalPoints from './components/TotalPoints/TotalPoints';
import TargetDuration from './components/TargetDuration/TargetDuration';
import Timer from './components/Timer/Timer';
import { useParams } from 'react-router-dom';
import {
  createTimer,
  getTimer,
  updateComplete,
  updatePause,
  updateReset,
  updateStart,
  updateTargetDuration,
} from '../../services/TimerService';
import Toast from '../../components/Toast/Toast';
import { getTotalPoint } from '../../services/PointService';

const TodayFocus = () => {
  const { id } = useParams();
  const [targetDuration, setTargetDuration] = useState(0);
  const [timerCount, setTimerCount] = useState(targetDuration);
  const [timerStatus, setTimerStatus] = useState('CANCELED');
  const h = Math.floor((targetDuration / (1000 * 60 * 60)) % 24);
  const m = Math.floor((targetDuration / (1000 * 60)) % 60);
  const s = Math.floor((targetDuration / 1000) % 60);
  const [toggleForm, setToggleForm] = useState('DEFAULT');
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [seconds, setSeconds] = useState(s);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [totalPoint, setTotalPoint] = useState(0);

  const timerRef = useRef();

  // 타이머 토스트 메세지 함수
  const setTimerToast = (type, points = 0) => {
    setToastType(type);
    setToastMsg(
      type === 'error'
        ? '집중이 중단되었습니다.'
        : `${points}포인트를 획득했습니다!`,
    );
    setToastShow(true);
  };

  // 타이머 초기화 함수
  const initTimer = () => {
    setTargetDuration(1500000);
    setTimerCount(1500000);
    setTimerStatus('CANCELED');
  };

  // 오늘의 집중 페이지 렌더링
  useEffect(() => {
    try {
      const fetchTimer = async () => {
        const data = await getTimer(id);
        const timerData = data.timer;
        const totalPointData = await getTotalPoint(id);
        setTitle(data.title);
        if (!timerData) {
          initTimer();
          await createTimer(id);
          return;
        }

        setTotalPoint(totalPointData);
        setTargetDuration(timerData.targetDuration);
        setTimerStatus(timerData.status);
        // 타이머 남은 시간 계산 로직
        if (timerData.status === 'IN_PROGRESS') {
          const now = Date.now();
          const lastStartedAt = new Date(timerData.lastStartedAt);

          const timeDiff = now - lastStartedAt;
          const totalElapsedTime = timerData.elapsedTime + timeDiff;
          const remainingTime = timerData.targetDuration - totalElapsedTime;

          if (remainingTime < 0) {
            setTimerStatus('COMPLETED');
            setTimerCount(totalElapsedTime - timerData.targetDuration + 700);
          } else {
            setTimerCount(remainingTime + 700);
          }
        } else {
          setTimerCount(timerData.targetDuration - timerData.elapsedTime + 700);
        }
      };

      fetchTimer();
    } catch (error) {
      console.error(error);
    }
  }, [id]);

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
  }, [timerStatus]);

  // 토스트 메시지 출력
  useEffect(() => {
    setTimeout(() => {
      setToastShow(false);
      setToastType('');
      setToastMsg('');
    }, 3000);
  }, [toastShow]);

  // 폼 토글 핸들러 (클릭 시 수정 폼으로 변환)
  const toggleFormHandler = () => {
    if (timerStatus === 'CANCELED') {
      if (toggleForm === 'DEFAULT') {
        setHours(h);
        setMinutes(m);
        setSeconds(s);
        setToggleForm('FORM');
      } else {
        setToggleForm('DEFAULT');
      }
    }
  };

  /*---------------------------
            input 핸들러
      -------------------------*/
  const hoursInputHandler = (e) => {
    const newHours = e.target.value;
    if (isNaN(newHours)) {
      setError('숫자를 입력해주세요');
    } else if (newHours >= 24) {
      setError('23시 이하로 입력해주세요');
    } else {
      setHours(newHours);
      setError('');
    }
  };

  const minutesInputHandler = (e) => {
    const newMinutes = e.target.value;
    if (isNaN(newMinutes)) {
      setError('숫자를 입력해주세요');
    } else if (newMinutes >= 60) {
      setError('59분 이하로 입력해주세요');
    } else {
      setMinutes(newMinutes);
      setError('');
    }
  };

  const secondsInputHandler = (e) => {
    const newSeconds = e.target.value;
    if (isNaN(newSeconds)) {
      setError('숫자를 입력해주세요');
    } else if (newSeconds >= 60) {
      setError('59초 이하로 입력해주세요');
    } else {
      setSeconds(newSeconds);
      setError('');
    }
  };

  // 목표 시간 설정 핸들러
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!hours) {
      setHours(0);
    }
    if (!minutes) {
      setMinutes(0);
    }
    if (!seconds) {
      setSeconds(0);
    }

    const formattedMs =
      Number(hours) * 1000 * 60 * 60 +
      Number(minutes) * 1000 * 60 +
      Number(seconds) * 1000;

    // if (formattedMs < 600000) {
    //   setError('10분 이상으로 입력해주세요');
    //   return;
    // }

    setTargetDuration(formattedMs);
    setTimerCount(formattedMs);
    setToggleForm('DEFAULT');
    setError('');
    await updateTargetDuration(id, formattedMs);
  };

  /*-----------------------------------------------------
          타이머 조작 핸들러(시작, 일시정지, 리셋)
  ------------------------------------------------------*/
  const timerStartHandler = async () => {
    setTimerStatus('IN_PROGRESS');
    await updateStart(id);
  };

  const timerPauseHandler = async () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimerStatus('PAUSED');
    setTimerToast('error');
    await updatePause(id);
  };

  const timerResetHandler = async () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimerStatus('CANCELED');
    setTimerCount(targetDuration);
    await updateReset(id);
  };

  const timerCompleteHandler = async () => {
    const points = await updateComplete(id);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTotalPoint((prev) => prev + points);
    initTimer();
    setTimerToast('success', points);
  };

  return (
    <>
      <div className="wrapper">
        <div className={styles.focusWrapper}>
          <div>
            <FocusHeader studyId={id} title={title} />
            <TotalPoints points={totalPoint} />
          </div>
          <main className={styles.timerWrapper}>
            <div className={styles.timerHeader}>
              <h2>오늘의 집중</h2>
              <TargetDuration
                targetDuration={targetDuration}
                toggleForm={toggleForm}
                error={error}
                setError={setError}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                onToggleForm={toggleFormHandler}
                onChangeHours={hoursInputHandler}
                onChangeMinutes={minutesInputHandler}
                onChangeSeconds={secondsInputHandler}
                onSubmitTarget={submitHandler}
              />
            </div>
            <Timer
              timer={timerCount}
              toggleForm={toggleForm}
              targetDuration={targetDuration}
              setTargetDuration={setTargetDuration}
              timerStatus={timerStatus}
              onStart={timerStartHandler}
              onPause={timerPauseHandler}
              onReset={timerResetHandler}
              onComplete={timerCompleteHandler}
            />
          </main>
        </div>
      </div>
      {toastShow && <Toast toastType={toastType} toastMsg={toastMsg} />}
    </>
  );
};

export default TodayFocus;
