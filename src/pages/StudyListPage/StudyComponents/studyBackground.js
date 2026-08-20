import bg5 from '../../../assets/images/img5.png';
import bg6 from '../../../assets/images/img6.png';
import bg7 from '../../../assets/images/img7.png';
import bg8 from '../../../assets/images/img8.png';

/*
서버에서 내려주는 background ID를 스터디 카드 배경 스타일로 매핑
단일색상은 카드의 스타일을 깔끔하게 하기 위해서 이미지를 사용하지 않고, 색상으로 처리

사용:
- getStudyBackgroundValue(study.background)
- isImageBackground(study.background)
*/

const solidBackgroundColors = {
  green: '#E1EDDE',
  yellow: '#FDF1C7',
  blue: '#D7EAF4',
  pink: '#FDE0E9',
};

const solidNicknameColors = {
  green: '#578246',
  yellow: '#C28B16',
  blue: '#4E7FA3',
  pink: '#B76A84',
};

const imageBackgroundMap = {
  bg5,
  bg6,
  bg7,
  bg8,
};

const imageBackgroundIds = ['bg5', 'bg6', 'bg7', 'bg8'];

export const isImageBackground = (background) => {
  return imageBackgroundIds.includes(background);
};

export const getStudyBackgroundColor = (background) => {
  return solidBackgroundColors[background] ?? solidBackgroundColors.green;
};

export const getStudyBackgroundImage = (background) => {
  return imageBackgroundMap[background] ?? null;
};

export const getStudyNicknameColor = (background) => {
  return solidNicknameColors[background] ?? solidNicknameColors.green;
};
