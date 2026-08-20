const API_URL = import.meta.env.VITE_API_URL;

export const getLogs = async (id, formattedDate, page = 1) => {
  try {
    const response = await fetch(`${API_URL}/api/logs/${id}/logs?date=${formattedDate}&page=${page}&pageSize=5`);
    
    if (!response.ok) {
      console.error("데이터 로드 실패:", response.status);
      return {
        data: {
          logs: [],
          pagination: {
            totalPages: 1
          }
        }
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      data: {
        logs: [],
        pagination: {
          totalPages: 1
        }
      }
    };
  }
};