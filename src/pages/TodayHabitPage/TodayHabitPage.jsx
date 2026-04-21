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

const TodayHabitPage = () => {
  const [studyUser, setStudyUser] = useState('');
  const [studyName, setStudyName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [habits, setHabits] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [editHabits, setEditHabits] = useState([]);
  const [endHabitIds, setEndHabitIds] = useState([]);
  const [errorInfos, setErrorInfos] = useState([]);

  const { id } = useParams();

  // 오늘의 습관 조회
  const fetchHabits = async () => {
    try {
      const data = await getTodayHabits(id);
      setStudyName(data.studyTitle);
      setStudyUser(data.studyNickname);
      setHabits(data.habits);
    } catch (error) {
      console.error(error);
    }
  };

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

  // 습관 수정 모달 열기
  const onOpenModalHandler = () => {
    setEditHabits(habits);
    setEndHabitIds([]);
    setIsModalOpen(true);
  };

  // 습관 수정 모달 닫기
  const onCloseModalHandler = () => {
    setIsModalOpen(false);
    setEditHabits([]);
    setEndHabitIds([]);
  };

  // 습관 수정
  const onConfirmEditHandler = async () => {
    if (isSubmitting) return;

    // 습관명 오류 메세지
    const errors = editHabits
      .map((h, index) => {
        const name = h.name.trim();

        if (!name) {
          return { index, message: '이름은 필수 입력입니다.' };
        }

        if (name.length < 2) {
          return { index, message: '2자 이상 입력해주세요' };
        }

        if (name.length > 20) {
          return { index, message: '20자 이하로 입력해주세요' };
        }

        return null;
      })

      .filter(Boolean);

    if (errors.length > 0) {
      setErrorInfos(errors);

      return;
    }

    const newHabits = editHabits.filter((h) => h.isNew);

    const updatedHabits = editHabits.filter((eH) => {
      if (eH.isNew) return false;

      const originalHabit = habits.find((h) => h.id === eH.id);

      if (!originalHabit) return false;

      return originalHabit.name !== eH.name.trim();
    });

    try {
      setIsSubmitting(true);

      for (const h of newHabits) {
        await postHabit(id, h.name.trim());
      }

      await Promise.all([
        ...updatedHabits.map((h) => editHabit(id, h.id, h.name.trim())),
        ...endHabitIds.map((h) => deleteHabit(id, h)),
      ]);

      await fetchHabits();
      onCloseModalHandler();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 습관 추가
  const onAddHabitHandler = () => {
    setEditHabits((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        name: '',
        isNew: true,
      },
    ]);
  };

  // 습관 종료
  const onRemoveHabitHandler = (habit) => {
    if (habit.isNew) {
      setEditHabits((prev) => prev.filter((h) => h.id !== habit.id));
      return;
    }
    setEndHabitIds((prev) => [...prev, habit.id]);
    setEditHabits((prev) => prev.filter((h) => h.id !== habit.id));
  };

  return (
    <>
      <div className="wrapper">
        <div className={styles.bodyWrapper}>
          <section className={styles.header}>
            <HabitHeader studyUser={studyUser} studyName={studyName} id={id} />
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
