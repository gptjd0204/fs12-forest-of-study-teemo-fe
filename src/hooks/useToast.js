import { useState } from 'react';

import Toast from '../components/Toast/Toast';

/*
 *
 *  사용법
 *  토스트를 추가할 곳에서 addToast(type, msg, contentType)를 사용합니다.
 *  toasts 배열을 사용하여 Toast 컨텐츠를 생성합니다.
 *
 */
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, msg, contentType = 'toast') => {
    // 같은 contentType 의 메시지가 5번 이상 발생했을 때 return (최대 5개 유지)
    const toastLength = toasts.filter(
      (toast) => toast.contentType === contentType,
    ).length;

    if (toastLength > 5) {
      return;
    }

    const id = Math.random();
    const newToast = {
      id,
      type,
      msg,
      contentType,
    };

    // toast 등록 (배열에 추가)
    setToasts((prev) => [...prev, newToast]);

    // toast 삭제 (3초 후) (배열에서 같은 id 발견 후 삭제)
    setTimeout(
      () => setToasts((prev) => prev.filter((p) => p.id !== id)),
      3000,
    );
  };

  return { addToast, toasts };
};

export default useToast;
