import React from "react";
import styles from "./DashboardOverview.module.css";
import PictureAndAddFounds from "./PictureAndAddFounds/PictureAndAddFounds";
import WalletBalance from './WalletBalance/WalletBalance';
import GoalOverview from './Goal/GoalOverview';
import { withRouter } from 'react-router-dom'; 
import { useMediaQuery } from 'react-responsive';

const DashboardOverview = (props) => {
  const { location } = props;
  const isMobile = useMediaQuery({ query: `(max-width: 419px)` });
  
  if(isMobile){
    if (location.pathname.match("/dashboard/settings") || location.pathname.match("/dashboard/savings")){
      return null;
    }
  }
 
  return (
    <div className={styles.DashboardOverview}>
      <PictureAndAddFounds />
      <WalletBalance/>
      <GoalOverview/>
    </div>
  );
};

export default withRouter(DashboardOverview);
