import React from 'react';
import HabitModal from '../../../components/Modal/HabitModal/HabitModal';
import HabitEditForm from './HabitEditForm';
import styles from '../TodayHabitPage.module.css';

const HabitConfirmModal = ({
  onClose,
  onConfirm,
  editHabits,
  setEditHabits,
  onAddHabit,
  onRemoveHabit,
  errorInfos,
  setErrorInfos,
}) => {
  return (
    <>
      <HabitModal
        title="습관 목록"
        onClose={onClose}
        onConfirm={onConfirm}
        closeBtnType="button"
        confirmBtnType="button"
      >
        <HabitEditForm
          editHabits={editHabits}
          setEditHabits={setEditHabits}
          onAddHabit={onAddHabit}
          onRemoveHabit={onRemoveHabit}
          errorInfos={errorInfos}
          setErrorInfos={setErrorInfos}
        />
        {errorInfos.length > 0 && (
          <p className={styles.errorMessage}>{errorInfos[0].message}</p>
        )}
      </HabitModal>
    </>
  );
};

export default HabitConfirmModal;
