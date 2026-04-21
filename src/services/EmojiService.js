const API_URL = import.meta.env.VITE_API_URL;

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
