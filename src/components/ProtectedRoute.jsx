import { Navigate, useParams } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { id } = useParams();
  const isVerified = sessionStorage.getItem(`isPasswordVerified${id}`);

  // 비밀번호를 한번도 인증하지 않았으면 스터디 상세 조회 페이지로 이동
  if (isVerified !== 'true') {
    return <Navigate to={`/${id}/detail`} replace />;
  }
  return children;
};

export default ProtectedRoute;
