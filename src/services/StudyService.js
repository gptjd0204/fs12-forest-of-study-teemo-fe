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
  rewardPoint: study.rewardPoint ?? 0,
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
