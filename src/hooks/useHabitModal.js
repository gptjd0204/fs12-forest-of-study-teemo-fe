import { useState } from 'react';
import { postHabit, editHabit, deleteHabit } from '../services/HabitService';

const useHabitModal = ({ id, habits, fetchHabits, inputClassName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editHabits, setEditHabits] = useState([]);
  const [endHabitIds, setEndHabitIds] = useState([]);
  const [errorInfos, setErrorInfos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 습관 수정 모달 열기
  const onOpenModalHandler = () => {
    setEditHabits(habits);
    setEndHabitIds([]);
    setErrorInfos([]);
    setIsModalOpen(true);
  };

  // 습관 수정 모달 닫기
  const onCloseModalHandler = () => {
    setIsModalOpen(false);
    setEditHabits([]);
    setEndHabitIds([]);
    setErrorInfos([]);
  };

  // 습관 수정
  const onConfirmEditHandler = async () => {
    if (isSubmitting) return;

    // 습관명 무결성 검사
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

    const updatedHabits = editHabits.filter((editedHabit) => {
      if (editedHabit.isNew) return false;

      const originalHabit = habits.find((h) => h.id === editedHabit.id);
      if (!originalHabit) return false;

      return originalHabit.name !== editedHabit.name.trim();
    });

    try {
      setIsSubmitting(true);

      for (const habit of newHabits) {
        await postHabit(id, habit.name.trim());
      }

      await Promise.all([
        ...updatedHabits.map((habit) =>
          editHabit(id, habit.id, habit.name.trim()),
        ),
        ...endHabitIds.map((habitId) => deleteHabit(id, habitId)),
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

    setTimeout(() => {
      const inputs = document.querySelectorAll(`.${inputClassName}`);
      const lastInput = inputs[inputs.length - 1];
      lastInput?.focus();
    }, 0);
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

  return {
    isModalOpen,
    editHabits,
    setEditHabits,
    errorInfos,
    setErrorInfos,
    isSubmitting,
    onOpenModalHandler,
    onCloseModalHandler,
    onConfirmEditHandler,
    onAddHabitHandler,
    onRemoveHabitHandler,
  };
};

export default useHabitModal;
