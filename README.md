# 🌳 공부의 숲

## 📌 프로젝트 소개

많은 사람들이 목표를 설정하고 꾸준한 습관을 만들고 싶어 하지만, 이것을 지속하는 것은 쉽지 않습니다. 공부의 숲은 이러한 문제를 해결하기 위해 습관을 형성하고, 집중시간에 따라 포인트를 지급하는 기능을 가지고있는 웹사이트 입니다.

---

## 🚀 주요 기능

- 스터디 목록
- 스터디 생성
- 오늘의 습관
- 오늘의 집중
- 스터디 로그

---

## 🛠️ 기술 스택

### Frontend

- React
- React Router DOM
- Vite
- emoji-picker-react
- JavaScript

---

## 📁 프로젝트 구조

FE

```
src/
├── assets/ # 이미지, 아이콘 등 정적 파일
├── icons/
├── images/

├── components/ # 공통 UI 컴포넌트
│ ├── Button/
│ ├── CurrentTime/
│ ├── Emoji/
│ ├── Header/
│ ├── Input/
│ ├── LinkButton/
│ ├── Modal/
│ ├── ScrollAlwaysTop/
│ ├── Toast/
│ └── TotalPoint/

├── pages/ # 페이지 단위 컴포넌트

│ ├── CreatePage/
│ │ ├── CreateComponents/ #각자 페이지에 필요한 컴포넌트들
│ │ ├── StudyCreate.jsx
│ │ └── Create.module.css

│ ├── LogPage/
│ │ ├── components/
│ │ ├── LogPage.jsx
│ │ └── LogPage.module.css

│ ├── NotFoundPage/

│ ├── StudyDetailPage/
│ │ ├── components/
│ │ ├── StudyDetailPage.jsx
│ │ └── StudyDetailPage.module.css

│ ├── StudyListPage/
│ │ ├── StudyComponents/
│ │ ├── StudyListPage.jsx
│ │ └── StudyListPage.module.css

│ ├── TodayFocusPage/
│ │ ├── components/
│ │ ├── TodayFocus.jsx
│ │ └── TodayFocus.module.css

│ ├── TodayHabitPage/
│ │ ├── HabitComponents/
│ │ ├── TodayHabitPage.jsx
│ │ └── TodayHabitPage.module.css

│ └── UpdatePage/

├── services/ # API 요청 로직 (비즈니스 로직)
│ ├── CreateService.js
│ ├── EmojiService.js
│ ├── HabitService.js
│ ├── LogService.js
│ ├── PointService.js
│ ├── StudyService.js
│ └── TimerService.js

├── styles/ # 전역 스타일
│ ├── .gitkeep
│ ├── pattern.css
│ └── reset.css

├── utils/ # 공통 유틸 함수
│ ├── formattedDate.js
│ ├── formattedTime.js
│ └── logCalculator.js
```

## ⚙️ 설치 및 실행 방법

### 1. 프로젝트 주소

FE 레포지토리 주소
https://github.com/gptjd0204/fs12-forest-of-study-teemo-fe.git

### 2. 패키지 설치

npm install

- React DOM
- React Router DOM
- emoji-picker-react

### 3. 실행

npm run dev

## 🌐 API 연동

- 백엔드 서버: http://localhost:8080
- API 통신은 services 폴더에서 관리

## 📌 기타

- 컴포넌트 기반 구조로 설계
- 페이지별 기능 분리
