import styles from './TodayFocus.module.css';
import FocusHeader from './components/FocusHeader/FocusHeader';
import TotalPoints from './components/TotalPoints/TotalPoints';
import TargetDuration from './components/TargetDuration/TargetDuration';
import Timer from './components/Timer/Timer';
import { useParams } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import useFetchTimer from '../../hooks/useFetchTimer';
import useTargetDuration from '../../hooks/useTargetDuration';
import useTimer from '../../hooks/useTimer';

const TodayFocus = () => {
  const { id } = useParams();
  const {
    targetDuration,
    setTargetDuration,
    timerCount,
    setTimerCount,
    timerStatus,
    setTimerStatus,
    totalPoint,
    setTotalPoint,
    title,
  } = useFetchTimer(id);

  const {
    toggleForm,
    hours,
    minutes,
    seconds,
    error,
    setError,
    toggleFormHandler,
    hoursInputHandler,
    minutesInputHandler,
    secondsInputHandler,
    submitHandler,
  } = useTargetDuration(
    id,
    targetDuration,
    timerStatus,
    setTargetDuration,
    setTimerCount,
  );

  const {
    toast,
    timerStartHandler,
    timerPauseHandler,
    timerResetHandler,
    timerCompleteHandler,
  } = useTimer(
    id,
    targetDuration,
    setTargetDuration,
    setTotalPoint,
    timerStatus,
    setTimerStatus,
    timerCount,
    setTimerCount,
  );

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
              timerCount={timerCount}
              toggleForm={toggleForm}
              timerStatus={timerStatus}
              onStart={timerStartHandler}
              onPause={timerPauseHandler}
              onReset={timerResetHandler}
              onComplete={timerCompleteHandler}
            />
          </main>
        </div>
      </div>
      {toast.show && <Toast toastType={toast.type} toastMsg={toast.msg} />}
    </>
  );
};

export default TodayFocus;
