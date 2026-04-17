import React, { useEffect, useState } from 'react';
import '../../styles/reset.css';
import styles from '../CreatePage/Create.module.css';

import NicknameInput from '../../components/input/NicknameInput';

import Button from '../../components/Button/Button';

import StudyName from '../CreatePage/CreateComponents/StudyName';
import Introduce from '../CreatePage/CreateComponents/Introduce/Introduce';
import BackGround from '../CreatePage/CreateComponents/BackGround/BackGround';

import { getStudy } from '../../services/CreateService';
import { patchService } from '../../services/CreateService';
import { useNavigate, useParams } from 'react-router-dom';

const StudyUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('params id:', id);

  const [nickname, setNickname] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [background, setBackground] = useState('');

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

      alert('스터디 수정 완료!');
      navigate(`/${id}/detail`);
    } catch (error) {
      console.error(error);
      alert('수정 실패');
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
      </div>
    </div>
  );
};

export default StudyUpdate;
