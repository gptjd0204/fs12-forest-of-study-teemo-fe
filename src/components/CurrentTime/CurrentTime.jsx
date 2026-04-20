import { useEffect, useState } from "react";
import styles from "./CurrentTime.module.css"

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const rawHours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = rawHours >= 12 ? "오후" : "오전";
  const hours = rawHours % 12 || 12;

  return `${year}-${month}-${day} ${period} ${hours}:${minutes}`;
};

const CurrentTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() => {
        setNow(new Date());
      }, 1000);

      return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={styles.currentTimeLabel}>현재 시간</span>
      <span className={styles.currentTime}>{formatDate(now)}</span>
    </div>
  );
};

export default CurrentTime;