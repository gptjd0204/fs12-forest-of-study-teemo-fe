const API_URL = import.meta.env.VITE_API_URL;
const STUDY_API_URL = `${API_URL}/api/studies`;
const RECENT_STUDY_LIST_KEY = 'recentStudyList';

////////////////// N일째 진행 중 데이터 계산 //////////////////
const getStudyProgressText = (createdAt) => {
  if (!createdAt) {
    return '';
  }

  const createdDateText = createdAt.split('T')[0];
  const todayDateText = new Date().toISOString().split('T')[0];
  const createdDate = new Date(`${createdDateText}T00:00:00`);
  const todayDate = new Date(`${todayDateText}T00:00:00`);

  if (
    Number.isNaN(createdDate.getTime()) ||
    Number.isNaN(todayDate.getTime())
  ) {
    return '';
  }

  const diffTime = todayDate.getTime() - createdDate.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

  return `${diffDays + 1}일째 진행 중`;
};

// 스터디 데이터
const normalizeStudy = (study) => ({
  id: study.id,
  nickname: study.nickname ?? '',
  title: study.title ?? '',
  description: study.description ?? '',
  background: study.background ?? '',
  createdAt: study.createdAt ?? '',
  updatedAt: study.updatedAt ?? '',
  progressText: study.progressText || getStudyProgressText(study.createdAt),
  totalPoint: study.totalPoint ?? 0,
  commentCount: study.commentCount ?? 0,
  fireCount: study.fireCount ?? 0,
  heartCount: study.heartCount ?? 0,
});

////////////////// 스터디 목록 불러오기 //////////////////
export const getStudyList = async ({
  page = 1,
  pageSize = 6,
  keyword = '',
  orderBy = 'latest',
} = {}) => {
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  });

  if (keyword.trim()) {
    searchParams.set('keyword', keyword.trim());
  }

  const response = await fetch(`${STUDY_API_URL}?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('스터디 목록을 불러오지 못했습니다.');
  }

  const result = await response.json();
  const studies = result?.data?.studies ?? [];
  const pagination = result?.data?.pagination ?? null;
  const filters = result?.data?.filters ?? null;

  return {
    studies: studies.map(normalizeStudy),
    pagination,
    filters,
  };
};

// 스터디 상세 조회
export const getStudyDetail = async (id) => {
  const res = await fetch(`${API_URL}/api/studies/${id}`);
  const data = await res.json();

  return data.data;
};

// 스터디 삭제
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

// 비밀번호 체크
export const validatePassword = async (id, password) => {
  try {
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

    return data;
  } catch (error) {
    console.error(error);
  }
};

////////////////// 로컬 스토리지 사용하여 최근 스터디 목록 불러오기 //////////////////
export const getRecentStudyList = () => {
  const storedValue = localStorage.getItem(RECENT_STUDY_LIST_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue.map(normalizeStudy) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

////////////////// 로컬스토리지에 최근 조회 목록 저장 //////////////////
export const saveRecentStudy = (study) => {
  const recentStudyList = getRecentStudyList();
  const filteredStudyList = recentStudyList.filter(
    (recentStudy) => recentStudy.id !== study.id,
  );
  const nextRecentStudyList = [
    normalizeStudy(study),
    ...filteredStudyList,
  ].slice(0, 3);

  localStorage.setItem(
    RECENT_STUDY_LIST_KEY,
    JSON.stringify(nextRecentStudyList),
  );
};

//////////////////스터디 삭제 시 로컬 스토리지에서도 삭제//////////////////
export const removeRecentStudy = (studyId) => {
  const recentStudyList = getRecentStudyList();
  const nextRecentStudyList = recentStudyList.filter(
    (recentStudy) => String(recentStudy.id) !== String(studyId),
  );

  localStorage.setItem(
    RECENT_STUDY_LIST_KEY,
    JSON.stringify(nextRecentStudyList),
  );
};

//////////////////스터디 수정 로컬스토리지 반영//////////////////
export const updateRecentStudy = (studyId, studyData) => {
  const recentStudyList = getRecentStudyList();

  const updatedList = recentStudyList.map((study) => {
    const isTargetStudy = String(study.id) === String(studyId);

    if (!isTargetStudy) {
      return study;
    }

    const updatedStudy = {
      ...study,
      ...studyData,
      id: study.id,
    };

    return normalizeStudy(updatedStudy);
  });

  localStorage.setItem(RECENT_STUDY_LIST_KEY, JSON.stringify(updatedList));
};
