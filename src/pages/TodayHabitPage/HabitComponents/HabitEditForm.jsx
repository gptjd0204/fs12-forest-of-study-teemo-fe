import React from 'react';

const HabitEditForm = ({ editHabits, setEditHabits, onAddHabit }) => {
  const changeHabitHandler = (id, value) => {
    setEditHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, name: value } : h)),
    );
  };

  return (
    <>
      {editHabits.map((h) => (
        <input
          key={h.id}
          value={h.name}
          onChange={(e) => changeHabitHandler(h.id, e.target.value)}
        />
      ))}

      <button type="button" onClick={onAddHabit}>
        +
      </button>
    </>
  );
};

export default HabitEditForm;
