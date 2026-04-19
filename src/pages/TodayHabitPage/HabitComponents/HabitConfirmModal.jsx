import React from 'react';
import HabitModal from '../../../components/Modal/HabitModal/HabitModal';
import HabitEditForm from './HabitEditForm';

const HabitConfirmModal = ({
  onClose,
  onConfirm,
  editHabits,
  setEditHabits,
}) => {
  return (
    <>
      <HabitModal title="습관 목록" onClose={onClose} onConfirm={onConfirm}>
        <HabitEditForm editHabits={editHabits} setEditHabits={setEditHabits} />
      </HabitModal>
    </>
  );
};

export default HabitConfirmModal;
