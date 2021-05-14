import React from "react";
import styles from "./Search.module.css";
import searchIcon from '../../../assets/searchIcon.svg'

const Search = () => {
  return (
    <div className={styles.Search}>
      <img className={styles.searchIcon} src={searchIcon}/>
      <input
        className={styles.input}
        placeholder="Search by transaction or amount"
        type="search"
      />
    </div>
  );
};

export default Search;
