import styles from './Button.module.css';

/*
    button 을 추가합니다.
    btnTxt = button 내부에 들어갈 text
    btnStyle = button style className
    onClick = onClick 시 사용될 함수
    btnType = 'submit' or 'button'
*/
const Button = ({ btnTxt, btnStyle, onClick, btnType }) => {
  return (
    <button
      type={btnType}
      className={`btn ${styles[btnStyle]}`}
      onClick={onClick}
    >
      {btnTxt}
    </button>
  );
};

export default Button;
