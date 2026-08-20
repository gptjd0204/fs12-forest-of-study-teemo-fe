import Button from '../../Button/Button';
import ModalLayout from '../ModalLayout';
import styles from './HabitModal.module.css';

/*
  HabitModal 컴포넌트

  title            = 모달 상단에 표시될 제목
  children         = 모달 본문에 들어갈 내용 (input, 리스트 등)

  onClose          = 취소 버튼 클릭 시 실행될 함수 (모달 닫기)
  onConfirm        = 확인 버튼 클릭 시 실행될 함수 (저장 / 수정 완료)

  closeBtnType     = 취소 버튼 타입 ('button' | 'submit')
  confirmBtnType   = 확인 버튼 타입 ('button' | 'submit')
*/

const HabitModal = ({
  title,
  children,
  onClose,
  onConfirm,
  closeBtnType,
  confirmBtnType,
}) => {
  return (
    <>
      <ModalLayout>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <Button
            btnTxt="취소"
            btnStyle="btnCancel"
            onClick={onClose}
            btnType={closeBtnType}
          />
          <Button
            btnTxt="수정 완료"
            btnStyle="btnModification"
            onClick={onConfirm}
            btnType={confirmBtnType}
          />
        </div>
      </ModalLayout>
    </>
  );
};

export default HabitModal;
