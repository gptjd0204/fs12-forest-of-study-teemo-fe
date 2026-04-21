import styles from './TargetDuration.module.css';
import { formattedTime } from '../../../../utils/formattedTime';
import icTimer from '../../../../assets/icons/ic_timer.svg';

const TargetDuration = ({
  targetDuration,
  toggleForm,
  error,
  setError,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  onToggleForm,
  onChangeHours,
  onChangeMinutes,
  onChangeSeconds,
  onSubmitTarget,
}) => {
  return (
    <>
      {toggleForm === 'DEFAULT' ? (
        <button onClick={onToggleForm} className={styles.targetBtn}>
          <img src={icTimer} />
          <p>{formattedTime(targetDuration)}</p>
        </button>
      ) : (
        <form
          className={styles.targetDurationContainer}
          onSubmit={onSubmitTarget}
        >
          {error !== '' && <span className={styles.error}>{error}</span>}
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={hours}
              onChange={onChangeHours}
              onBlur={() => {
                setError('');
                if (!hours) {
                  setHours(0);
                }
              }}
            />
            <p>시</p>
            <input
              type="text"
              value={minutes}
              onChange={onChangeMinutes}
              onBlur={() => {
                setError('');
                if (!minutes) {
                  setMinutes(0);
                }
              }}
            />
            <p>분</p>
            <input
              type="text"
              value={seconds}
              onChange={onChangeSeconds}
              onBlur={() => {
                setError('');
                if (!seconds) {
                  setSeconds(0);
                }
              }}
            />
            <p>초</p>
          </div>
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.targetDurationBtn}>
              수정
            </button>
            <button
              type="button"
              className={styles.targetDurationBtn}
              onClick={onToggleForm}
            >
              취소
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default TargetDuration;
