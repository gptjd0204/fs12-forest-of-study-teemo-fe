import { useEffect, useState } from 'react';
import { getTodayHabits, toggleHabit } from '../services/HabitService';

const useTodayHabits = (id) => {
  const [studyUser, setStudyUser] = useState('');
  const [studyName, setStudyName] = useState('');
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

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

  useEffect(() => {
    if (!id) return;
    fetchHabits();
  }, [id]);

  // 습관 완료 토글
  const onToggleHabitHandler = async (habitId) => {
    if (togglingId === habitId) return;

    try {
      setTogglingId(habitId);

      await toggleHabit(id, habitId);

      setHabits((prev) =>
        prev.map((h) =>
          h.id === habitId ? { ...h, isCompleted: !h.isCompleted } : h,
        ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setTogglingId(null);
    }
  };

  return {
    studyUser,
    studyName,
    habits,
    isLoading,
    togglingId,
    fetchHabits,
    onToggleHabitHandler,
  };
};

export default useTodayHabits;
