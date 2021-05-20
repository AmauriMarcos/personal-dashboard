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
          src="https://d3n8a8pro7vhmx.cloudfront.net/imaginebetter/pages/313/meta_images/original/blank-profile-picture-973460_1280.png?1614051091"
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
