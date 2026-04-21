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
import NotFound from '../NotFoundPage/NotFound';

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
    isNotFoundError,
  } = useFetchTimer(id);

  const {
    toggleForm,
    hours,
    setHours,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
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
    toasts,
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

  console.log('toasts => ', toasts);
  return (
    <>
      {isNotFoundError ? (
        <NotFound />
      ) : (
        <>
          <div className={`wrapper ${styles.wrapper}`}>
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
                    setHours={setHours}
                    minutes={minutes}
                    setMinutes={setMinutes}
                    seconds={seconds}
                    setSeconds={setSeconds}
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
          {toasts.length > 0 &&
            toasts.map((t) => {
              return <Toast key={t.id} toastType={t.type} toastMsg={t.msg} />;
            })}
        </>
      )}
    </>
  );
};

export default TodayFocus;
