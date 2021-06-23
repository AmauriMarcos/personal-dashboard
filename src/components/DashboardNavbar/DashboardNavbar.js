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
      <ul className={styles.BoxIcons}>
        <div to="/login" onClick={goHome}>
          <IconButton aria-label="Home Icon">
            <HomeOutlined className={classes.Icons} />
          </IconButton>
        </div>
        <Link to="/dashboard">
          <IconButton aria-label="Home Icon">
            <Dashboard className={classes.Icons} />
          </IconButton>
        </Link>
        <Link to="/dashboard/settings">
          <IconButton aria-label="Settings Icon">
            <SettingsOutlined className={classes.Icons} />
          </IconButton>
        </Link>
        <Link to="/dashboard/savings">
          <IconButton aria-label="Saving Icon">
            <ShowChart className={classes.Icons} />
          </IconButton>
        </Link>
      </ul>
      <div className={styles.BoxLogout} onClick={handleLogout}>
        <IconButton aria-label="Logout Icon">
          <ExitToAppOutlined className={classes.Icons} />
        </IconButton>
      </div>
    </div>
  );
};

export default DashboardNavbar;
