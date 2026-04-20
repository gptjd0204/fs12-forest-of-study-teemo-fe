import styles from './Timer.module.css';
import icPlay from '../../../../assets/icons/ic_play.svg';
import icPause from '../../../../assets/icons/ic_pause.svg';
import icRestart from '../../../../assets/icons/ic_restart.svg';
import icStop from '../../../../assets/icons/ic_stop.svg';
import { formattedTime } from '../../../../utils/formattedTime';

const Timer = ({
  timerCount,
  toggleForm,
  timerStatus,
  onStart,
  onPause,
  onReset,
  onComplete,
}) => {
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
            onClick={onComplete}
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
                onClick={onPause}
                disabled={timerStatus === 'PAUSED'}
              >
                <img src={icPause} />
              </button>
            )}
            <button
              className={styles.startBtn}
              onClick={onStart}
              disabled={timerStatus === 'IN_PROGRESS' || toggleForm === 'FORM'}
            >
              <img src={icPlay} />
              Start!
            </button>
            {timerStatus !== 'CANCELED' && (
              <button
                className={`${styles.restartBtn} ${styles.ctrlBtn}`}
                onClick={onReset}
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
