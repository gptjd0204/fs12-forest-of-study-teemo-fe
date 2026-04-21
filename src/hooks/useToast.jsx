import { useState } from 'react';

import Toast from '../components/Toast/Toast';

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, msg) => {
    const id = Math.random();
    const newToast = {
      id,
      toast: <Toast key={id} toastType={type} toastMsg={msg} />,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(
      () => setToasts((prev) => prev.filter((p) => p.id !== id)),
      3000,
    );
  };

  return { addToast, toasts };
};

export default useToast;
