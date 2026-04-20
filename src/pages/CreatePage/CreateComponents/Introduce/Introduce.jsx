import styles from './Introduce.module.css';

const Introduce = ({ description, setDescription }) => {
  return (
    <div className={styles.introduceContainer}>
      <textarea
        className={styles.inputIntroduce}
        placeholder="소개 멘트를 작성해 주세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
      />
    </div>
  );
};

export default Introduce;
