import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import HabitTable from './components/HabitTable/HabitTable';
import Emojis from './components/Emoji/EmojiContainer';
import Interaction from './components/Interaction/Interaction';
import StudyDetail from './components/StudyDetail/StudyDetail';
import Modals from './components/Modals/Modals';

import Toast from '../../components/Toast/Toast';

import { getStudyDetail, saveRecentStudy } from '../../services/StudyService.js';

import styles from './StudyDetailPage.module.css';

const StudyDetailPage = () => {
  const { id } = useParams();

  const [study, setStudy] = useState([]);

  const [modalStep, setModalStep] = useState(null);
  const [modalType, setModalType] = useState(null);

  const toastTimerRef = useRef(null);
  const [isToast, setIsToast] = useState(false);
  const [toastType, setToastType] = useState('');

  const toastTypes = {
    error: {
      type: 'error',
      msg: '비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
    },
    link: {
      type: 'success',
      msg: '링크가 복사되었습니다!',
    },
    emoji: {
      type: 'error',
      msg: '이모지 등록중입니다! 잠시 후 다시 시도해주세요!',
    },
  };

  const fetchStudy = async () => {
    try {
      const data = await getStudyDetail(id);

      if (!data) {
        return;
      }

      setStudy(data);
      saveRecentStudy(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchStudy();
  }, []);

  // 수정을 눌렀는지 습관을 눌렀는지 로그를 눌렀는지 . . .
  const modalHandler = (type) => {
    setModalType(type);
    setModalStep('password');
  };

  const shareHandler = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);

    toastHandler('link');
  };

  const toastHandler = (type) => {
    setToastType(type);

    clearTimeout(toastTimerRef.current);
    setIsToast(true);
    toastTimerRef.current = setTimeout(() => setIsToast(false), 3000);
  };

  return (
    <div className="wrapper">
      <div className={styles.ixWrapper}>
        <Emojis toastHandler={toastHandler} />
        <Interaction onClick={modalHandler} onShare={shareHandler} />
      </div>

      <div className={styles.introWrapper}>
        <StudyDetail onClick={modalHandler} id={id} study={study} />
      </div>

      <main className={styles.innerWrapper}>
        <h2 className={styles.tableTitle}>습관 기록표</h2>

        <HabitTable id={id} />
      </main>

      <Modals
        id={id}
        studyInfo={{
          nickname: study.nickname,
          title: study.title,
        }}
        modalStep={modalStep}
        setModalStep={setModalStep}
        modalType={modalType}
        setModalType={setModalType}
        toastHandler={toastHandler}
      />

      {isToast && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Toast
            toastType={toastTypes[toastType].type}
            toastMsg={toastTypes[toastType].msg}
          />
        </div>
      )}
    </div>
  );
};

export default StudyDetailPage;
