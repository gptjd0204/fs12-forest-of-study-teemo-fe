import styles from "./LogPage.module.css";
import arrowLeft from '../../assets/icons/ic_arrow_left_big.svg';
import arrowRight from '../../assets/icons/ic_arrow_right_big.svg';
import { checkIsToday } from "../../../utils/formattedDate";

const LogDateSelector = ({ date, setDate, formatDate }) => {
    const prevDateHandler = () => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      setDate(newDate);
    }
  
    const nextDateHandler = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (date >= today) {
        return;
      }
  
      const newDate = new Date(date);
  
      newDate.setDate(newDate.getDate() + 1);
      setDate(newDate);
    }

  return (
    <div className={styles.dateSelectorContainer}>
      <button onClick={prevDateHandler}>
        <img alt="이전 날짜" src={arrowLeft}/>
      </button>
      <span className={styles.nowDate}>
        {formatDate(date)}
      </span>
      <button 
        onClick={nextDateHandler}
        style={{ visibility: isToday() ? "hidden" : "visible"}}>
        <img alt="다음 날짜" src={arrowRight}/>
      </button>
    </div>
  );
};

export default LogDateSelector;