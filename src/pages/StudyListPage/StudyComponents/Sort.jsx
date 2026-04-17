import styles from './Sort.module.css';
import toggleIcon from '../../../assets/icons/ic_toggle.svg';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'mostPoints', label: '포인트 많은 순' },
  { value: 'leastPoints', label: '포인트 적은 순' },
];

const Sort = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.selectWrapper}>
      <select className={styles.select} value={value} onChange={handleChange}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <img src={toggleIcon} alt="" className={styles.toggleIcon} />
    </div>
  );
};

export default Sort;
