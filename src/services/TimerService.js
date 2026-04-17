const API_URL = import.meta.env.VITE_API_URL;

export const getTimer = async (studyId) => {
  try {
    const response = await fetch(`${API_URL}/api/timers/${studyId}`);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createTimer = async (studyId) => {
  try {
    const response = await fetch(`${API_URL}/api/timers/${studyId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('데이터 응답에 실패했습니다');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTargetDuration = async (studyId, targetDuration) => {
  try {
    const response = await fetch(
      `${API_URL}/api/timers/${studyId}/target-duration`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetDuration,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('데이터 응답에 실패했습니다');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateStart = async (studyId) => {
  try {
    const response = await fetch(`${API_URL}/api/timers/${studyId}/start`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('데이터 응답에 실패했습니다');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updatePause = async (studyId) => {
  try {
    const response = await fetch(`${API_URL}/api/timers/${studyId}/pause`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('데이터 응답에 실패했습니다');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateReset = async (studyId) => {
  try {
    const response = await fetch(`${API_URL}/api/timers/${studyId}/reset`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('데이터 응답에 실패했습니다');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateComplete = async (studyId) => {
  try {
    const response = await fetch(`${API_URL}/api/timers/${studyId}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('데이터 응답에 실패했습니다');
    }
    const { data } = await response.json();

    const points = data.createdPoint.points;
    return points;
  } catch (error) {
    console.error(error);
  }
};
