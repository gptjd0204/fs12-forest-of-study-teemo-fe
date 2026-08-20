import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const StudyLayout = () => {
  return (
    <>
      <Header />
      <div className="layout">
        <Outlet />
      </div>
    </>
  );
};

export default StudyLayout;
