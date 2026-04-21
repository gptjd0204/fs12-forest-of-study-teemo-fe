import { useEffect, useRef, useState } from 'react';

import Toast from '../components/Toast/Toast';

const useToast = () => {
  const toastTimerRef = useRef(null);
  const [isToast, setIsToast] = useState(false);

  const addToast = (type, msg) => {
    const newToast = <Toast toastType={type} toastMsg={msg} />;
  };

  return {
    isToast,
    setIsToast,
  };
};

export default useToast;
