import React from "react";
import styles from "./PictureAndAddFounds.module.css";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useStyles } from "../../../StylesMaterialUi/StylesMaterialUi";

const PictureAndAddFounds = () => {
  const classes = useStyles();
  return (
    <div className={styles.pictureAndAddFounds}>
      <div className={styles.boxImage}>
        <img
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
          className={styles.image}
        />
      </div>
      <Button
        variant="contained"
        className={classes.overviewButton}
        startIcon={<Add className={classes.overviewButtonIcon} />}
      >
        Add founds
      </Button>
    </div>
  );
};

export default PictureAndAddFounds;
