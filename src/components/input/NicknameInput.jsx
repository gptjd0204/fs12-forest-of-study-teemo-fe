import { useState } from 'react';
import styles from './Input.module.css';

const NicknameInput = ({ nickname, setNickname }) => {
  const [error, setError] = useState('');
  const [newnickname, setNewNickname] = useState(false);

  const validateNickname = (value) => {
    if (!value) {
      return '필수 입력사항입니다.';
    }
    if (value !== value.trim()) {
      return '앞뒤 공백은 사용할 수 없습니다.';
    }
    if (value.length < 2) {
      return '닉네임은 2자 이상이어야 합니다.';
    }
    if (value.length > 10) {
      return '닉네임은 10자 이하이어야 합니다.';
    }
    return '';
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={newnickname && error ? styles.inputError : styles.input}
        type="text"
        placeholder="닉네임을 입력해 주세요"
        value={nickname}
        onChange={(e) => {
          const value = e.target.value;
          setNickname(value);
          setError(validateNickname(value));
        }}
        onBlur={() => setNewNickname(true)}
        maxLength={10}
      />
      {newnickname && error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
};

export default NicknameInput;
