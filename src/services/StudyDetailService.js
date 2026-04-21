const API_URL = import.meta.env.VITE_API_URL;
import { removeRecentStudy } from './StudyService.js';

export const getStudyDetail = async (id) => {
  const res = await fetch(`${API_URL}/api/studies/${id}`);
  const data = await res.json();

  return data.data;
};

export const validatePassword = async (id, password) => {
  const res = await fetch(`${API_URL}/api/studies/${id}/pw`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
    }),
  });

  const data = await res.json();

  return data.data;
};

export const deleteStudy = async (id) => {
  const res = await fetch(`${API_URL}/api/studies/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();

  if (res.ok) {
    removeRecentStudy(id);
  }

  return data.data;
};

// emoji
export const getEmojis = async (id) => {
  const res = await fetch(`${API_URL}/api/emojis/${id}`);
  const data = await res.json();

  return data.data;
};

export const createEmojis = async (id, emoji) => {
  const res = await fetch(`${API_URL}/api/emojis/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emoji,
    }),
  });

  const data = await res.json();

  return data.data;
};

export const updateEmojis = async (id, emojiId) => {
  const res = await fetch(`${API_URL}/api/emojis/${id}/${emojiId}`, {
    method: 'PATCH',
  });

  const data = await res.json();

  return data.data;
};

export const getWeeklyHabits = async (id) => {
  const res = await fetch(`${API_URL}/api/habits/${id}/weekly`);
  const data = await res.json();

  const habits = data.data.habits;

  const weeklyHabits = habits.map((habit) => {
    let isCompleted = [false, false, false, false, false, false, false];

    const days = habit.records.forEach((record) => {
      const date = new Date(record.date);
      const day = date.getDay() - 1; // date 는 일요일 시작이라 1 빼줌

      isCompleted[day] = record.isCompleted;
      return;
    });

    return { title: habit.name, isCompleted };
  });

  return weeklyHabits;
};
