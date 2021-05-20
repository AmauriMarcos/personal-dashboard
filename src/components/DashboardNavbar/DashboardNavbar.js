import React from "react";
import styles from "./DashboardNavbar.module.css";
import {
  HomeOutlined,
  PersonOutline,
  SettingsOutlined,
  ExitToAppOutlined,
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
      /* toast.dark("👋 You are now logged out!", {
        position: toast.POSITION.TOP_LEFT,
      }); */
    } catch {
      alert("Failed to logout");
    }
  }

  return (
    <div className={styles.DashboardNavbar}>
      <ul className={styles.BoxIcons}>
        <Link to="/dashboard">
          <IconButton aria-label="Home Icon">
            <HomeOutlined className={classes.Icons} />
          </IconButton>
        </Link>
        <IconButton aria-label="Profile Icon">
          <PersonOutline className={classes.Icons} />
        </IconButton>
        <Link to="/dashboard/settings">
          <IconButton aria-label="Settings Icon">
            <SettingsOutlined className={classes.Icons} />
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
