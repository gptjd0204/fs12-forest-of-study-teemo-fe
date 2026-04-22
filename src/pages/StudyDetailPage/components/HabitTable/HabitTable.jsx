import { useEffect, useState } from 'react';

import HabitItems from './HabitItems/HabitItems';

import styles from '../HabitTable/HabitTable.module.css';
import ContentSpinner from '../../../../components/Loading/ContentSpinner';

const HabitTable = ({ id, isLoading, habits }) => {
  return (
    <>
      {isLoading ? (
        habits.length === 0 ? (
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
        )
      ) : (
        <div className={styles.emptyTable}>
          <ContentSpinner />
        </div>
      )}
    </>
  );
};

export default HabitTable;
