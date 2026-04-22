const API_URL = import.meta.env.VITE_API_URL;

// 습관 조회
export const getTodayHabits = async (id) => {
  const response = await fetch(`${API_URL}/api/habits/${id}/today`);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || '습관 조회를 실패했습니다');
  }

  return result.data;
};

// 주간 습관 조회
export const getWeeklyHabits = async (id) => {
  const res = await fetch(`${API_URL}/api/habits/${id}/weekly`);
  const data = await res.json();

  const habits = data.data.habits;

  const weeklyHabits = habits.map((habit) => {
    const DAYS_IN_WEEK = 7;
    const compeletedDays = new Array(DAYS_IN_WEEK).fill(false);

    const days = habit.records.forEach((record) => {
      const date = new Date(record.date);
      const day = (date.getDay() + 6) % 7; // date 는 일요일 시작이라 1 빼줌

      compeletedDays[day] = record.isCompleted;
      return;
    });

    return { title: habit.name, compeletedDays };
  });

  return weeklyHabits;
};

// 습관 생성
export const postHabit = async (id, name) => {
  const response = await fetch(`${API_URL}/api/habits/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || '습관 생성을 실패했습니다.');
  }

  return result.data;
};

// 습관 토글
export const toggleHabit = async (studyId, habitId) => {
  const response = await fetch(
    `${API_URL}/api/habits/${studyId}/${habitId}/today`,
    {
      method: 'PATCH',
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || '습관 완료 상태 변경을 실패했습니다.');
  }

  return result.data;
};

// 습관 수정
export const editHabit = async (studyId, habitId, name) => {
  const response = await fetch(`${API_URL}/api/habits/${studyId}/${habitId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || '습관 완료 상태 변경을 실패했습니다.');
  }

  return result.data;
};

// 습관 삭제
export const deleteHabit = async (studyId, habitId) => {
  const response = await fetch(`${API_URL}/api/habits/${studyId}/${habitId}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || '습관 삭제를 실패했습니다.');
  }

  return result.data;
};
