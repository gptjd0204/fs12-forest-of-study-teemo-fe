import styles from './Loading.module.css';

const EmojiSkeleton = () => {
  return (
    <div className={styles.emojiMoreBoxSkeleton}>
      <div className={styles.emojiItemSkeleton}></div>
      <div className={styles.emojiItemSkeleton}></div>
      <div className={styles.emojiItemSkeleton}></div>
      <div className={styles.emojiItemSkeleton}></div>
    </div>
  );
};

export default EmojiSkeleton;
