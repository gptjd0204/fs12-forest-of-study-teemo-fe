import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useToast from '../../hooks/useToast.jsx';

import HabitTable from './components/HabitTable/HabitTable';
import Emojis from './components/Emoji/EmojiContainer';
import Interaction from './components/Interaction/Interaction';
import StudyDetail from './components/StudyDetail/StudyDetail';
import Modals from './components/Modals/Modals';

import { getStudyDetail } from '../../services/StudyService.js';

import styles from './StudyDetailPage.module.css';

const StudyDetailPage = () => {
  const { id } = useParams();

  const { toasts, addToast } = useToast();

  const [study, setStudy] = useState([]);

  const [modalStep, setModalStep] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchStudy = async () => {
    try {
      const data = await getStudyDetail(id);

      if (!data) {
        return;
      }

      setStudy(data);
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

    addToast('success', '링크가 복사되었습니다!');
  };

  return (
    <div className="wrapper">
      <div className={styles.ixWrapper}>
        <Interaction onClick={modalHandler} onShare={shareHandler} />
        <Emojis toastHandler={addToast} />
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
        toastHandler={addToast}
      />

      {toasts.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {toasts.map((toast) => toast.toast)}
        </div>
      )}
    </div>
  );
};

export default StudyDetailPage;
