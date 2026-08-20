import ModalLayout from '../ModalLayout';
import styles from './PasswordModal.module.css';

/*
  PasswordModal 컴포넌트

  title      = 모달 상단에 표시될 제목
  children   = 모달 본문에 들어갈 내용 (input, 안내 문구 등)

  onClose    = 모달 나가기 버튼 클릭 시 실행될 함수
*/

const PasswordModal = ({ nickname, title, onClose, children }) => {
  return (
    <>
      <ModalLayout>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>{nickname}의 </span>
            <span className={nickname.length > 5 ? styles.longTitle : ''}>
              {title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtnDesktop}
          >
            나가기
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtnMobile}
          >
            나가기
          </button>
        </div>
      </ModalLayout>
    </>
  );
};

export default PasswordModal;
