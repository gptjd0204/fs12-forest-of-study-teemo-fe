import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useToast from '../../hooks/useToast';

import HabitTable from './components/HabitTable/HabitTable';
import Emojis from './components/Emoji/EmojiContainer';
import Interaction from './components/Interaction/Interaction';
import StudyDetail from './components/StudyDetail/StudyDetail';
import Modals from './components/Modals/Modals';

import Toast from '../../components/Toast/Toast';

import {
  getStudyDetail,
  saveRecentStudy,
} from '../../services/StudyService.js';
import { getEmojis } from '../../services/EmojiService.js';
import { getWeeklyHabits } from '../../services/HabitService.js';

import styles from './StudyDetailPage.module.css';
import NotFound from '../NotFoundPage/NotFound.jsx';

const StudyDetailPage = () => {
  const { id } = useParams();

  const { toasts, addToast } = useToast();

  const [study, setStudy] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [habits, setHabits] = useState([]);

  const [modalStep, setModalStep] = useState(null);
  const [modalType, setModalType] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  const fetchDatas = async () => {
    try {
      const studyData = await getStudyDetail(id);

      if (!studyData) {
        setIsNotFoundPage(true);
        return;
      }
      const emojiData = await getEmojis(id);
      const habitData = await getWeeklyHabits(id);

      setStudy(studyData);
      setEmojis(emojiData);
      setHabits(habitData);

      saveRecentStudy(studyData);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // 수정을 눌렀는지 습관을 눌렀는지 로그를 눌렀는지 . . .
  const modalHandler = (type) => {
    setModalType(type);
    setModalStep('password');
  };

  const shareHandler = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);

    addToast('success', '링크가 복사되었습니다!', 'link');
  };

  return (
    <>
      {isNotFoundPage ? (
        <NotFound />
      ) : (
        <div className="wrapper">
          <div className={styles.ixWrapper}>
            <Interaction onClick={modalHandler} onShare={shareHandler} />
            <Emojis
              toastHandler={addToast}
              isLoading={isLoading}
              emojis={emojis}
              setEmojis={setEmojis}
            />
          </div>

          <div className={styles.introWrapper}>
            <StudyDetail
              onClick={modalHandler}
              id={id}
              study={study}
              isLoading={isLoading}
            />
          </div>

          <main className={styles.innerWrapper}>
            <h2 className={styles.tableTitle}>습관 기록표</h2>
            <HabitTable id={id} isLoading={isLoading} habits={habits} />
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
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  toastType={toast.type}
                  toastMsg={toast.msg}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudyDetailPage;
