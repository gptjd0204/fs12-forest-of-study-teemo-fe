import React from 'react';
import '../../styles/reset.css';
import styles from './Create.module.css';
import modalstyles from '../CreatePage/CreateComponents/CreateModal.module.css';

import NicknameInput from '../../components/input/NicknameInput';
import PasswordInput from '../../components/input/PasswordInput';
import Button from '../../components/Button/Button';
import CreateModal from '../CreatePage/CreateComponents/Modal/CreateModal';

import PasswordCheck from './CreateComponents/PasswordCheck';
import StudyName from './CreateComponents/StudyName';
import Introduce from './CreateComponents/Introduce/Introduce';
import BackGround from './CreateComponents/BackGround/BackGround';

import { postStudy } from '../../services/CreateService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudyCreate = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleSubmit = async () => {
    if (!nickname.trim() || !title.trim() || !background || !password.trim()) {
      setModalMessage('필수 항목을 입력해주세요.');
      setModalOpen(true);
      return;
    }

    if (password !== passwordCheck) {
      setModalMessage('비밀번호가 일치하지 않습니다');
      setModalOpen(true);
      return;
    }

    try {
      const data = {
        nickname,
        title,
        description,
        background,
        password,
      };

      const res = await postStudy(data);

      if (!res?.success) {
        setModalMessage(res?.message || '스터디 생성 실패');
        setModalOpen(true);
        return;
      }

      setModalMessage('스터디 생성 완료!');
      setRedirectUrl(`/${res.data.id}/detail`);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      setModalMessage('스터디 생성 실패');
      setModalOpen(true);
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);

    if (redirectUrl) {
      navigate(redirectUrl);
    }
  };

  return (
    <>
      <div className={styles.layoutCreate}>
        <div className={styles.wrapperCreate}>
          <h2 className={styles.bigTitle}>스터디 만들기</h2>
          <div>
            <h3 className={styles.title}>닉네임</h3>
            <NicknameInput nickname={nickname} setNickname={setNickname} />

            <h3 className={styles.title}>스터디 이름</h3>
            <StudyName title={title} setTitle={setTitle} />

            <h3 className={styles.title}>소개</h3>
            <Introduce
              description={description}
              setDescription={setDescription}
            />

            <div>
              <h3 className={styles.title}>배경을 선택해주세요</h3>
              <BackGround setBackground={setBackground} />
            </div>
          </div>

          <h3 className={styles.title}>비밀번호</h3>
          <PasswordInput password={password} setPassword={setPassword} />

          <h3 className={styles.title}>비밀번호 확인</h3>
          <PasswordCheck
            password={password}
            setPasswordCheck={setPasswordCheck}
            passwordCheck={passwordCheck}
          />

          <Button
            btnTxt="만들기"
            onClick={handleSubmit}
            btnType="button"
            btnStyle="btnCreate"
          />

          {modalOpen && (
            <CreateModal onClose={() => setModalOpen(false)}>
              <div className={modalstyles.modalBox}>
                <p className={modalstyles.modalText}>{modalMessage}</p>
                <button
                  className={modalstyles.confirmBtn}
                  onClick={handleConfirm}
                >
                  확인
                </button>
              </div>
            </CreateModal>
          )}
        </div>
      </div>
    </>
  );
};

export default StudyCreate;
