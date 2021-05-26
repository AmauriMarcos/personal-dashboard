import React, { useEffect, useState } from "react";
import styles from "./PictureAndAddFounds.module.css";
import { Button } from "@material-ui/core";
import { EmojiEvents} from "@material-ui/icons";
import { useStyles } from "../../../StylesMaterialUi/StylesMaterialUi";
import { useDash } from "../../Context/DashContext";
import axios from "axios";
import firebase from "firebase";

const PictureAndAddFounds = () => {
  const classes = useStyles();
  const { currentUser, userURL, imageNotFoundPicture, fileFromServer, userInfo, getUserInfo } =
    useDash();

  return (
    <div className={styles.pictureAndAddFounds}>
      {fileFromServer === null ? (
        <div className={styles.boxImage}>
          <img src={imageNotFoundPicture} className={styles.image} />
        </div>
      ) : (
        <div className={styles.boxImage}>
          <img src={userURL} className={styles.image} />
        </div>
      )}

      <Button
        variant="contained"
        className={classes.overviewButton}
        startIcon={<EmojiEvents className={classes.overviewButtonIcon} />}
      >
        Goal
      </Button>
    </div>
  );
};

export default PictureAndAddFounds;
