import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase/app";
import { useAuth } from "../../components/Context/AuthContext";
import styles from "./Dashboard.module.css";
import Nav from "../../components/DashboardNavbar/DashboardNavbar";
import Main from "../../components/DashboardMain/DashboardMain";
import Overview from "../../components/DashboardOverview/DashboardOverview";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from '../../components/Settings/Settings';
import PrivateRoute from "../../components/PrivateRoute";
import Savings from '../../components/Savings/Savings';
import SavingModal from '../../components/SavingModal/SavingModal';
import GoalModal from '../../components/GoalModal/GoalModal'
import { useMediaQuery } from 'react-responsive';
/* import { useLocation } from 'react-router-dom'; */

const Dashboard = ({ children }) => {
/*   const location = useLocation();
  console.log(location.pathname === "/dashboard/savings");
  const isMobile = useMediaQuery({ query: `(max-width: 419px)` }); */

  return (
    <div className={styles.Dashboard}>     
      <GoalModal/>
      <SavingModal/>
      <Router>
        <Nav />
          <Switch>
             <PrivateRoute exact path="/dashboard" component={Main}/>
             <PrivateRoute  path="/dashboard/settings" component={Settings}/>
             <PrivateRoute  path="/dashboard/savings" component={Savings}/>
          </Switch>     
       <Overview />
      </Router>
    </div>
  );
};

export default Dashboard;
