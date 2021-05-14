import React from "react";
import styles from './MainContent.module.css';
import Transactions from './Transactions/Transactions';

const MainContent = () => {
  return (
      <div className={styles.MainContent}>
          <div className={styles.charts}>

          </div>
          <Transactions/>
      </div>
  )
};

export default MainContent;


