import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase/app";
import { useAuth } from "../../components/Context/AuthContext";
import styles from './Dashboard.module.css';



const Dashboard = ({ children }) => {
  
  return (
    <div className={styles.Dashboard}>
      {children}
    </div>
  );
};

export default Dashboard;
