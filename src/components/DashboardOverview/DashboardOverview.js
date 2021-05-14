import React from "react";
import styles from "./DashboardOverview.module.css";
import PictureAndAddFounds from "./PictureAndAddFounds/PictureAndAddFounds";
import WalletBalance from './WalletBalance/WalletBalance';
import Goal from './Goal/Goal';

const DashboardOverview = () => {
  return (
    <div className={styles.DashboardOverview}>
      <PictureAndAddFounds />
      <WalletBalance/>
      <Goal/>
    </div>
  );
};

export default DashboardOverview;
