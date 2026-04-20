import React from 'react';
import './App.css';
import './styles/pattern.css';
import './styles/reset.css';
import { Route, Routes } from 'react-router-dom';
import StudyLayout from './layouts/StudyLayout';
import StudyListPage from './pages/StudyListPage/StudyListPage';
import TodayFocus from './pages/TodayFocusPage/TodayFocus';
import LogPage from './pages/LogPage/LogPage';
import StudyDetailPage from './pages/StudyDetailPage/StudyDetailPage';
import TodayHabitPage from './pages/TodayHabitPage/TodayHabitPage';
import StudyCreate from './pages/CreatePage/StudyCreate';
import StudyUpdate from './pages/UpdatePage/StudyUpdate';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudyLayout />}>
          <Route index element={<StudyListPage />} />
          {/* 홈페이지는 <Route index element={<페이지 컴포넌트 />} /> 로 추가하기 */}
          {/* 각 페이지 <Route path="url" element={<페이지 컴포넌트 />} /> 로 추가하기 */}
          <Route path=":id/focus" element={<TodayFocus />} />
          <Route path=":id/logs" element={<LogPage />} />
          <Route path=":id/detail" element={<StudyDetailPage />} />
          <Route path=":id/habit" element={<TodayHabitPage />} />
          <Route path=":id/update" element={<StudyUpdate />} />
          <Route path="/create" element={<StudyCreate />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
