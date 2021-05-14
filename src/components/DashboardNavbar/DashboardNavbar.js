import React from "react";
import styles from "./DashboardNavbar.module.css";
import {
  HomeOutlined,
  PersonOutline,
  SettingsOutlined,
  ExitToAppOutlined
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import {useStyles} from '../../StylesMaterialUi/StylesMaterialUi';

const DashboardNavbar = () => {
  const classes = useStyles();
  return (
    <div className={styles.DashboardNavbar}>
      <ul className={styles.BoxIcons}>
        <IconButton aria-label="Home Icon">
          <HomeOutlined className={classes.Icons}/>
        </IconButton>
        <IconButton aria-label="Profile Icon">
          <PersonOutline className={classes.Icons}/>
        </IconButton>
        <IconButton aria-label="Settings Icon">
          <SettingsOutlined className={classes.Icons} />
        </IconButton>
      </ul>
      <div className={styles.BoxLogout}>
        <IconButton aria-label="Logout Icon">
          <ExitToAppOutlined className={classes.Icons}/>
        </IconButton>
      </div>
    </div>
  );
};

export default DashboardNavbar;
