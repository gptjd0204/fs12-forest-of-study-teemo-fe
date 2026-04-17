import React, { useEffect, useState } from 'react';
import styles from './TodayHabitPage.module.css';
import { useParams } from 'react-router-dom';
import {
  getTodayHabits,
  postHabit,
  toggleHabit,
} from '../../services/HabitService';
import HabitHeader from './HabitComponents/HabitHeader';
import HabitConfirmModal from './HabitComponents/HabitConfirmModal';
import HabitList from './HabitComponents/HabitList';
import HabitListHeader from './HabitComponents/HabitListHeader';
import CurrentTime from '../../components/CurrentTime/CurrentTime';

const TodayHabitPage = () => {
  const [studyName, setStudyName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [habits, setHabits] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const { id } = useParams();

  const fetchHabits = async () => {
    try {
      const data = await getTodayHabits(id);
      setStudyName(data.studyTitle);
      setHabits(data.habits);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [id]);

  // 습관 토글
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

  // 모달 열기
  const onOpenModalHandler = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const onCloseModalHandler = () => {
    setIsModalOpen(false);
    setNewHabit('');
  };

  const createHabit = async () => {
    if (!newHabit.trim() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await postHabit(id, newHabit);
      onCloseModalHandler();
      fetchHabits();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className={styles.bodyWrapper}>
          <section className={styles.header}>
            <HabitHeader studyName={studyName} id={id} />
            <CurrentTime />
          </section>
          <section className={styles.mainSection}>
            <div className={styles.todayHabit}>
              <HabitListHeader onOpenModal={onOpenModalHandler} />
              <HabitList habits={habits} onToggleHabit={onToggleHabitHandler} />
            </div>
          </section>
        </div>
      </div>
      {isModalOpen && (
        <HabitConfirmModal
          onClose={onCloseModalHandler}
          onConfirm={createHabit}
          newHabit={newHabit}
          setNewHabit={setNewHabit}
        />
      )}
    </>
  );
};

export default TodayHabitPage;
