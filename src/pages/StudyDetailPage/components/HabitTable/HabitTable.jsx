import { useEffect, useState } from 'react';

import HabitItems from './HabitItems/HabitItems';

import { getWeeklyHabits } from '../../../../services/HabitService';

import styles from '../HabitTable/HabitTable.module.css';

const HabitTable = ({ id }) => {
  const [habits, setHabits] = useState([]);

  const fetchData = async () => {
    const data = await getWeeklyHabits(id);

    setHabits(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {habits.length === 0 ? (
        <p className={styles.emptyTable}>
          아직 습관이 없어요
          <br />
          오늘의 습관에서 습관을 생성해보세요
        </p>
      ) : (
        <table className={styles.habitTable}>
          <thead>
            <tr>
              <th></th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
              <th>일</th>
            </tr>
          </thead>
          <tbody>
            <HabitItems datas={habits} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default HabitTable;
