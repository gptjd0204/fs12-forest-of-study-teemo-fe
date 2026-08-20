import styles from './Toast.module.css';

/*
    toast ui 를 추가합니다.

    toastType = 'success' or 'error'
    toastMsg = toast에 들어갈 메시지 (예: 집중이 중단되었습니다.)
*/

const Toast = ({ toastType = 'success', toastMsg = '성공했습니다!' }) => {
  const toastClassName =
    toastType === 'success' ? 'toastSuccess' : 'toastError';
  return (
    <div className={styles.toastContainer}>
      <div className={`${styles.toast} ${styles[toastClassName]}`}>
        {toastType === 'success' ? <p>🎉 {toastMsg}</p> : <p>🚨 {toastMsg}</p>}
      </div>
    </div>
  );
};

export default Toast;
