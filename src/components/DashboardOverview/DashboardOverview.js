import React from "react";
import styles from "./DashboardOverview.module.css";
import PictureAndAddFounds from "./PictureAndAddFounds/PictureAndAddFounds";
import WalletBalance from './WalletBalance/WalletBalance';
import GoalOverview from './Goal/GoalOverview';

const DashboardOverview = () => {
  return (
    <div className={styles.DashboardOverview}>
      <PictureAndAddFounds />
      <WalletBalance/>
      <GoalOverview/>
    </div>
  );
};

export default DashboardOverview;
