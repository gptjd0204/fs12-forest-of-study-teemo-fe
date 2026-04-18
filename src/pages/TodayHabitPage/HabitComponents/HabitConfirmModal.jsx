import React from 'react';
import HabitModal from '../../../components/Modal/HabitModal/HabitModal';
import HabitCreateForm from './HabitCreateForm';

const HabitConfirmModal = ({ onClose, onConfirm, newHabit, setNewHabit }) => {
  return (
    <>
      <HabitModal title="습관 목록" onClose={onClose} onConfirm={onConfirm}>
        <HabitCreateForm newHabit={newHabit} setNewHabit={setNewHabit} />
      </HabitModal>
    </>
  );
};

export default HabitConfirmModal;
