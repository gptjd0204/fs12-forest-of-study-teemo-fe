import styles from './ModalLayout.module.css';

const Modal = ({ children }) => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
