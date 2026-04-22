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
import CurrentTimeSkeleton from '../../components/Loading/CurrentTimeSkeleton';
import useHabitModal from '../../hooks/useHabitModal';
import useTodayHabits from '../../hooks/useTodayHabits';

const TodayHabitPage = () => {
  const { id } = useParams();

  const {
    studyUser,
    studyName,
    habits,
    isLoading,
    fetchHabits,
    onToggleHabitHandler,
  } = useTodayHabits(id);

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
            {isLoading ? <CurrentTimeSkeleton /> : <CurrentTime />}
          </section>
          <section className={styles.mainSection}>
            {isLoading ? (
              <div className={styles.loadingBox}>
                <ContentSpinner />
              </div>
            ) : (
              <div className={styles.todayHabit}>
                <HabitListHeader onOpenModal={onOpenModalHandler} />
                <HabitList
                  habits={habits}
                  onToggleHabit={onToggleHabitHandler}
                />
              </div>
            )}
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
