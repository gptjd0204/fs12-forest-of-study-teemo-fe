import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ModalLayout from '../../../../components/Modal/ModalLayout';
import PasswordModal from '../../../../components/Modal/PasswordModal/PasswordModal';
import PasswordInput from '../../../../components/input/PasswordInput';
import Button from '../../../../components/Button/Button';

import {
  deleteStudy,
  validatePassword,
} from '../../../../services/StudyService.js';

import styles from './Modals.module.css';

const Modals = ({
  id,
  studyInfo,
  modalStep,
  setModalStep,
  modalType,
  setModalType,
  toastHandler,
}) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');

  const modalInfos = {
    edit: {
      link: `/${id}/update`,
      txt: '수정하러 가기',
    },
    log: {
      link: `/${id}/logs`,
      txt: '로그로 가기',
    },
    habit: {
      link: `/${id}/habit`,
      txt: '습관으로 가기',
    },
    focus: {
      link: `/${id}/focus`,
      txt: '집중으로 가기',
    },
    delete: {
      txt: '삭제하기',
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await validatePassword(id, password);
    const isCorrect = data.correct;

    if (!isCorrect) {
      // toast ui 튀어나오기

      toastHandler('error');
      return;
    }

    if (modalType === 'delete') {
      setModalStep('delete');
      setPassword('');
      return;
    }

    navigate(modalInfos[modalType].link);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    const data = await deleteStudy(id);

    setModalStep('completed');
  };

  return (
    <>
      {modalStep === 'password' && (
        <PasswordModal
          onClose={() => {
            setModalStep(null);
            setPassword('');
          }}
          title={`${studyInfo.nickname}의 ${studyInfo.title}`}
        >
          <form>
            <p className={styles.formMessage}>권한이 필요해요!</p>
            <div className={styles.formInputField}>
              <label htmlFor="pw-id">비밀번호</label>
              <PasswordInput password={password} setPassword={setPassword} />
            </div>

            <Button
              btnTxt={modalInfos[modalType].txt}
              btnStyle="btnDefault"
              btnType={'submit'}
              onClick={(e) => submitHandler(e)}
            />
          </form>
        </PasswordModal>
      )}

      {modalStep === 'delete' && (
        <ModalLayout>
          <div className={styles.modalMsgBox}>
            <p>정말 삭제하시겠습니까?</p>
          </div>
          <div className={styles.modalBtnBox}>
            <Button
              btnTxt={'취소'}
              btnStyle="btnCancel"
              btnType={'button'}
              onClick={() => setModalStep(null)}
            />
            <Button
              btnTxt={'확인'}
              btnStyle="btnModification"
              btnType={'button'}
              onClick={(e) => deleteHandler(e)}
            />
          </div>
        </ModalLayout>
      )}

      {modalStep === 'completed' && (
        <ModalLayout>
          <div className={styles.modalMsgBox}>
            <p>삭제가 완료되었습니다.</p>
          </div>
          <div className={styles.modalBtnBox}>
            <Button
              btnTxt={'홈으로'}
              btnStyle="btnDefault"
              btnType={'button'}
              onClick={() => navigate('/')}
            />
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export default Modals;
