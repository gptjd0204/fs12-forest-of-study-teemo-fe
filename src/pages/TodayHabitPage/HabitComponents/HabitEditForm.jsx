import React from 'react';

const HabitEditForm = ({
  editHabits,
  setEditHabits,
  onAddHabit,
  onRemoveHabit,
}) => {
  const changeHabitHandler = (id, value) => {
    setEditHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: value } : h)),
    );
  };

  return (
    <>
      {editHabits.map((h) => (
        <div key={h.id}>
          <input
            value={h.name}
            onChange={(e) => changeHabitHandler(h.id, e.target.value)}
          />
          <button type="button" onClick={() => onRemoveHabit(h)}>
            삭제
          </button>
        </div>
      ))}

      <button type="button" onClick={onAddHabit}>
        +
      </button>
    </>
  );
};

export default HabitEditForm;
