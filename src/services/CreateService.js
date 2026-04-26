const API_URL = import.meta.env.VITE_API_URL;

export const postStudy = async (data) => {
  const response = await fetch(`${API_URL}/api/studies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const patchService = async (id, data) => {
  const response = await fetch(`${API_URL}/api/studies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};
