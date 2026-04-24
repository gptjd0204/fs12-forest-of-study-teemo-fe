import { useEffect, useRef } from 'react';

/*
    hook 설명 
    사용할 곳에서 <div ref={ref}> 처럼 외부에서 클릭되는 것을 감지할 컨테이너에 ref 값을 지정해줍니다
    해당 ref 가 설정된 컨테이너를 제외한 모든 곳을 클릭하였을 때 mouse out 함수가 실행됩니다.
    함수가 실행되면 받아온 setIsOpen 의 값을 false 로 만듭니다
*/
const useMouseOut = ({ setIsOpen }) => {
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener('mousedown', isMouseOut);
    return () => {
      window.removeEventListener('mousedown', isMouseOut);
    };
  }, []);

  const isMouseOut = (e) => {
    if (!ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return { ref };
};

export default useMouseOut;
