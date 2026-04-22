import { useState } from 'react';
import styles from './Input.module.css';
import closeeye from '../../assets/icons/ic_close_eye.png';
import openeye from '../../assets/icons/ic_eye.png';

const PasswordInput = ({ password, setPassword }) => {
  const [error, setError] = useState('');
  const [newpassword, setNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (value) => {
    if (!value) {
      return '필수 입력사항입니다.';
    }
    if (/\s/.test(value)) {
      return '공백은 사용할 수 없습니다.';
    }
    if (value.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.';
    }
    return '';
  };

  return (
    <div className={`${styles.inputContainer} ${styles.passwordContainer}`}>
      <div className={styles.inputWrapper}>
        <input
          id="pw-id"
          className={newpassword && error ? styles.inputError : styles.input}
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            setError(validatePassword(value));
          }}
          onBlur={() => setNewPassword(true)}
        />

        <img
          src={showPassword ? openeye : closeeye}
          alt="toggle password"
          className={styles.togglePassword}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      {newpassword && error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
};

export default PasswordInput;
