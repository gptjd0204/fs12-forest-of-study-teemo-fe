import { useState } from 'react';

import LinkButton from '../../../../components/LinkButton/LinkButton';
import Description from '../Description/Description';

import icArrowRight from '../../../../assets/icons/ic_arrow_right.svg';

import styles from './StudyDetail.module.css';

const StudyDetail = ({ onClick, id, study }) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <h1>
          {study.nickname}의 {study.title}
        </h1>
        <div className={styles.btnContainer}>
          <LinkButton
            text="로그"
            onClick={() => onClick('log')}
            type={'button'}
          />
          <LinkButton
            text="오늘의 습관"
            onClick={() => onClick('habit')}
            type={'button'}
          />
          <LinkButton
            text="오늘의 집중"
            onClick={() => onClick('focus')}
            type={'button'}
          />
        </div>
      </div>

      <div className={styles.descWrapper}>
        <Description descTitle={'소개'} descContent={study.description} />
        <Description descType={'point'} descTitle={'현재까지 획득한 포인트'} />
      </div>
    </>
  );
};

export default StudyDetail;
