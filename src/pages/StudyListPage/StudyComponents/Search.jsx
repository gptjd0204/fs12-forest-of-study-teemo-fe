import styles from './Search.module.css';
import searchIcon from '../../../assets/icons/ic_search.svg';

const Search = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <form className={styles.searchField} onSubmit={handleSubmit}>
      <img src={searchIcon} alt="" className={styles.searchIcon} />
      <input
        className={styles.input}
        placeholder="검색"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;
