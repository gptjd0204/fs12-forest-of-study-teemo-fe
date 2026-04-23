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

    if (isThisWeek(habit.startDate)) {
      const startDay = dayHandeler(habit.startDate);

      compeletedDays.fill('none', 0, startDay);
    }

    if (habit.endDate !== null && isThisWeek(habit.endDate)) {
      const endDay = dayHandeler(habit.endDate);

      compeletedDays.fill('none', endDay);
    }

    const days = habit.records.forEach((record) => {
      const day = dayHandeler(record.date);

      compeletedDays[day] = record.isCompleted;
      return;
    });

    return { title: habit.name, compeletedDays };
  });

  return weeklyHabits;
};

const isThisWeek = (date) => {
  const now = new Date();
  const target = new Date(date);

  // 현재 주의 월요일 구하기
  const dayOfWeek = now.getDay(); // 0(일) ~ 6(토)
  const sundayDiff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // 일요일이면 -6, 나머지 +1
  const startOfWeek = new Date(now.setDate(sundayDiff));
  startOfWeek.setHours(0, 0, 0, 0);

  // 현재 주의 일요일 구하기
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return target >= startOfWeek && target <= endOfWeek;
};

const dayHandeler = (date) => {
  const target = new Date(date);
  const day = (target.getDay() + 6) % 7; // date 는 일요일 시작이라 1 빼줌

  return day;
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
