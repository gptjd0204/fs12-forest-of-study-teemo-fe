import React, { useEffect, useState } from 'react';
import styles from './TodayHabitPage.module.css';
import { useParams } from 'react-router-dom';
import {
  getTodayHabits,
  postHabit,
  toggleHabit,
  editHabit,
  deleteHabit,
} from '../../services/HabitService';
import HabitHeader from './HabitComponents/HabitHeader';
import HabitConfirmModal from './HabitComponents/HabitConfirmModal';
import HabitList from './HabitComponents/HabitList';
import HabitListHeader from './HabitComponents/HabitListHeader';
import CurrentTime from '../../components/CurrentTime/CurrentTime';
import ContentSpinner from '../../components/Loading/ContentSpinner';
import useHabitModal from '../../hooks/useHabitModal';

const TodayHabitPage = () => {
  const [studyUser, setStudyUser] = useState('');
  const [studyName, setStudyName] = useState('');
  const [habits, setHabits] = useState([]);
  const [togglingId, setTogglingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  // 오늘의 습관 조회
  const fetchHabits = async () => {
    setIsLoading(true);

    try {
      const data = await getTodayHabits(id);
      setStudyName(data.studyTitle);
      setStudyUser(data.studyNickname);
      setHabits(data.habits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    isModalOpen,
    editHabits,
    setEditHabits,
    errorInfos,
    setErrorInfos,
    onOpenModalHandler,
    onCloseModalHandler,
    onConfirmEditHandler,
    onAddHabitHandler,
    onRemoveHabitHandler,
  } = useHabitModal({
    id,
    habits,
    fetchHabits,
    inputClassName: styles.habitInput,
  });

  useEffect(() => {
    fetchHabits();
  }, [id]);

  // 습관 완료 토글
  const onToggleHabitHandler = async (habitId) => {
    if (togglingId === habitId) return;

    try {
      setTogglingId(habitId);

      await toggleHabit(id, habitId);

      setHabits((prevHabits) =>
        prevHabits.map((h) =>
          h.id === habitId ? { ...h, isCompleted: !h.isCompleted } : h,
        ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className={styles.bodyWrapper}>
          <section className={styles.header}>
            <HabitHeader
              studyUser={studyUser}
              studyName={studyName}
              id={id}
              isLoading={isLoading}
            />
            <CurrentTime />
          </section>
          <section className={styles.mainSection}>
            <div className={styles.todayHabit}>
              <HabitListHeader onOpenModal={onOpenModalHandler} />{' '}
              {isLoading ? (
                <div className={styles.loadingBox}>
                  <ContentSpinner />
                </div>
              ) : (
                <HabitList
                  habits={habits}
                  onToggleHabit={onToggleHabitHandler}
                />
              )}
            </div>
          </section>
        </div>
      </div>
      {isModalOpen && (
        <HabitConfirmModal
          onClose={onCloseModalHandler}
          onConfirm={onConfirmEditHandler}
          editHabits={editHabits}
          setEditHabits={setEditHabits}
          onAddHabit={onAddHabitHandler}
          onRemoveHabit={onRemoveHabitHandler}
          errorInfos={errorInfos}
          setErrorInfos={setErrorInfos}
        />
      )}
    </>
  );
};

export default TodayHabitPage;
