import React from 'react';

const HabitCreateForm = ({ newHabit, setNewHabit }) => {
  return (
    <>
      <div>
        <input value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
      </div>
    </>
  );
};

export default HabitCreateForm;
