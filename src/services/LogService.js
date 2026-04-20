const API_URL = import.meta.env.VITE_API_URL;

export const getLogs = async (id, formattedDate) => {
  try {
    const response = await fetch(`${API_URL}/api/logs/${id}/logs?date=${formattedDate}`);
    
    if (!response.ok) {
      console.error("데이터 로드 실패:", response.status);
      return [];
    }

    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
};