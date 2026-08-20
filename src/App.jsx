import './App.css';
import './styles/pattern.css';
import './styles/reset.css';
import { Route, Routes } from 'react-router-dom';
import StudyLayout from './layouts/StudyLayout';
import StudyListPage from './pages/StudyListPage/StudyListPage';
import TodayFocus from './pages/TodayFocusPage/TodayFocus';
import LogPage from './pages/LogPage/LogPage';
import TodayHabitPage from './pages/TodayHabitPage/TodayHabitPage';
import StudyDetailPage from './pages/StudyDetailPage/StudyDetailPage';
import StudyCreate from './pages/CreatePage/StudyCreate';
import StudyUpdate from './pages/UpdatePage/StudyUpdate';
import NotFound from './pages/NotFoundPage/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudyLayout />}>
          <Route index element={<StudyListPage />} />
          <Route path="/create" element={<StudyCreate />} />
          <Route path=":id/detail" element={<StudyDetailPage />} />
          <Route
            path=":id/update"
            element={
              <ProtectedRoute>
                <StudyUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id/habit"
            element={
              <ProtectedRoute>
                <TodayHabitPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id/focus"
            element={
              <ProtectedRoute>
                <TodayFocus />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id/logs"
            element={
              <ProtectedRoute>
                <LogPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
