import { useState } from 'react';
import styles from './Interaction.module.css';

import Toast from '../../../../components/Toast/Toast';

const Interaction = ({ onClick, onShare }) => {
  return (
    <>
      <ul className={styles.interContainer}>
        <li>
          <button className={styles.greenText} onClick={() => onShare()}>
            공유하기
          </button>
        </li>
        <li className={styles.greenText}>|</li>
        <li>
          <button className={styles.greenText} onClick={() => onClick('edit')}>
            수정하기
          </button>
        </li>
        <li className={styles.grayText}>|</li>
        <li>
          <button className={styles.grayText} onClick={() => onClick('delete')}>
            스터디 삭제하기
          </button>
        </li>
      </ul>
    </>
  );
};

export default Interaction;
