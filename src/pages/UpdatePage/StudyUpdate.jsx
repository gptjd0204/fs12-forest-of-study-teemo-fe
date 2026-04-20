import React, { useEffect, useState } from 'react';
import '../../styles/reset.css';
import styles from '../CreatePage/Create.module.css';
import modalstyles from '../CreatePage/CreateComponents/Modal/CreateModal.module.css';

import NicknameInput from '../../components/input/NicknameInput';
import Button from '../../components/Button/Button';

import StudyName from '../CreatePage/CreateComponents/StudyName';
import Introduce from '../CreatePage/CreateComponents/Introduce/Introduce';
import BackGround from '../CreatePage/CreateComponents/BackGround/BackGround';
import CreateModal from '../CreatePage/CreateComponents/Modal/CreateModal';

import { getStudy } from '../../services/CreateService';
import { patchService } from '../../services/CreateService';
import { useNavigate, useParams } from 'react-router-dom';

const StudyUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nickname, setNickname] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudy(id);

        const data = res?.data;

        setNickname(data?.nickname || '');
        setTitle(data?.title || '');
        setDescription(data?.description || '');
        setBackground(data?.background || '');
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const data = {
        nickname,
        title,
        description,
        background,
      };

      await patchService(id, data);

      setModalMessage('수정이 완료되었습니다');
      setIsSuccess(true);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);

    if (isSuccess) {
      navigate(`/${id}/detail`);
    }
  };

  return (
    <div className={styles.layoutCreate}>
      <div className={styles.wrapperCreate}>
        <h2 className={styles.bigTitle}>스터디 수정</h2>

        <h3 className={styles.title}>닉네임</h3>
        <NicknameInput nickname={nickname} setNickname={setNickname} />

        <h3 className={styles.title}>스터디 이름</h3>
        <StudyName title={title} setTitle={setTitle} />

        <h3 className={styles.title}>소개</h3>
        <Introduce description={description} setDescription={setDescription} />

        <h3 className={styles.title}>배경</h3>
        <BackGround setBackground={setBackground} />

        <Button
          btnTxt="수정"
          onClick={handleSubmit}
          btnType="button"
          btnStyle="btnCreate"
        />

        {modalOpen && (
          <CreateModal onClose={() => setModalOpen(false)}>
            <div className={modalstyles.modalBox}>
              <p className={modalstyles.modalText}>{modalMessage}</p>
              {/* <button
                onClick={handleConfirm}
                className={modalstyles.confirmBtn}
              >
                확인
              </button> */}
              <div className={modalstyles.confirmBtn}>
                <Button
                  btnTxt="확인"
                  btnStyle="btnCreate"
                  onClick={handleConfirm}
                  btnType="button"
                />
              </div>
            </div>
          </CreateModal>
        )}
      </div>
    </div>
  );
};

export default StudyUpdate;
