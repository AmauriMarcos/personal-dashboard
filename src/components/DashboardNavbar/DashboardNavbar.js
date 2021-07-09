import React from "react";
import styles from "./DashboardNavbar.module.css";
import {
  HomeOutlined,
  PersonOutline,
  SettingsOutlined,
  ExitToAppOutlined,
  ShowChart,
  Dashboard
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Avatar from '../DashboardOverview/PictureAndAddFounds/PictureAndAddFounds'

const DashboardNavbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      history.push("/");
    } catch {
      alert("Failed to logout");
    }
  }

  const goHome = () =>{
     history.push("/");
     window.location.reload(true);
  }

  return (
    <div className={styles.DashboardNavbar}>
      <Avatar/>
      <ul className={styles.BoxIcons}>
        <Link to="/login" onClick={goHome} className={styles.iconsAndLinks}>
          <IconButton aria-label="Home Icon">
            <HomeOutlined className={classes.Icons} />
          </IconButton>
          <p>Home</p>
        </Link>
        <Link to="/dashboard" className={styles.iconsAndLinks}>
          <IconButton aria-label="Home Icon">
            <Dashboard className={classes.Icons} />
          </IconButton>
          <p>Dashboard</p>
        </Link>
        <Link to="/dashboard/settings" className={styles.iconsAndLinks}>
          <IconButton aria-label="Settings Icon">
            <SettingsOutlined className={classes.Icons} />
          </IconButton>
          <p>Settings</p>
        </Link>
        <Link to="/dashboard/savings" className={styles.iconsAndLinks}>
          <IconButton aria-label="Saving Icon">
            <ShowChart className={classes.Icons} />
          </IconButton>
          <p>Savings</p>
        </Link>
      </ul>
      <div className={styles.BoxLogout} onClick={handleLogout} className={styles.iconsAndLinks}>
        <IconButton aria-label="Logout Icon">
          <ExitToAppOutlined className={classes.Icons} />
        </IconButton>
        <p className={styles.logout}>Logout</p>
      </div>
    </div>
  );
};

export default DashboardNavbar;
