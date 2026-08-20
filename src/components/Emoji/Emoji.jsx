import styles from './Emoji.module.css';

const Emoji = ({ emoji, count, size = 'sm', onClick }) => {
  const sizeClass = {
    sm: styles.small,
    lg: styles.large,
  };

  const content = (
    <div className={styles.item}>
      <span className={sizeClass[size]} aria-hidden="true">
        {emoji}
      </span>
      <span className={sizeClass[size]}>{count}</span>
    </div>
  );

  return onClick ? <button onClick={onClick}>{content}</button> : content;
};

export default Emoji;
