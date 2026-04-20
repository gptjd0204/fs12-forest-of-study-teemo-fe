import { useState } from 'react';
import { updateTargetDuration } from '../services/TimerService';

/*------------------------------------------
     집중 목표 시간을 설정하는 커스텀 Hook
-------------------------------------------*/
const useTargetDuration = (
  studyId,
  targetDuration,
  timerStatus,
  setTargetDuration,
  setTimerCount,
) => {
  const h = Math.floor((targetDuration / (1000 * 60 * 60)) % 24);
  const m = Math.floor((targetDuration / (1000 * 60)) % 60);
  const s = Math.floor((targetDuration / 1000) % 60);

  const [toggleForm, setToggleForm] = useState('DEFAULT');
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [seconds, setSeconds] = useState(s);
  const [error, setError] = useState('');

  // 폼 토글 핸들러 (클릭 시 수정 폼으로 변환)
  const toggleFormHandler = () => {
    if (timerStatus === 'CANCELED') {
      if (toggleForm === 'DEFAULT') {
        setHours(h);
        setMinutes(m);
        setSeconds(s);
        setToggleForm('FORM');
      } else {
        setToggleForm('DEFAULT');
      }
    }
  };

  /*--------------------------------
              input 핸들러
-----------------------------------*/
  const hoursInputHandler = (e) => {
    const newHours = e.target.value;
    if (isNaN(newHours)) {
      setError('숫자를 입력해주세요');
    } else if (newHours >= 24) {
      setError('23시 이하로 입력해주세요');
    } else {
      setHours(newHours);
      setError('');
    }
  };

  const minutesInputHandler = (e) => {
    const newMinutes = e.target.value;
    if (isNaN(newMinutes)) {
      setError('숫자를 입력해주세요');
    } else if (newMinutes >= 60) {
      setError('59분 이하로 입력해주세요');
    } else {
      setMinutes(newMinutes);
      setError('');
    }
  };

  const secondsInputHandler = (e) => {
    const newSeconds = e.target.value;
    if (isNaN(newSeconds)) {
      setError('숫자를 입력해주세요');
    } else if (newSeconds >= 60) {
      setError('59초 이하로 입력해주세요');
    } else {
      setSeconds(newSeconds);
      setError('');
    }
  };

  // 목표 시간 설정 핸들러
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!hours) {
      setHours(0);
    }
    if (!minutes) {
      setMinutes(0);
    }
    if (!seconds) {
      setSeconds(0);
    }

    const formattedMs =
      Number(hours) * 1000 * 60 * 60 +
      Number(minutes) * 1000 * 60 +
      Number(seconds) * 1000;

    // if (formattedMs < 600000) {
    //   setError('10분 이상으로 입력해주세요');
    //   return;
    // }

    setTargetDuration(formattedMs);
    setTimerCount(formattedMs);
    setToggleForm('DEFAULT');
    setError('');
    await updateTargetDuration(studyId, formattedMs);
  };

  return {
    toggleForm,
    hours,
    minutes,
    seconds,
    error,
    setError,
    toggleFormHandler,
    hoursInputHandler,
    minutesInputHandler,
    secondsInputHandler,
    submitHandler,
  };
};

export default useTargetDuration;
