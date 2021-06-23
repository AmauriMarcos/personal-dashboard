import React, { useEffect, useState } from "react";
import styles from "./PictureAndAddFounds.module.css";
import { Button } from "@material-ui/core";
import { EmojiEvents } from "@material-ui/icons";
import { useStyles } from "../../../StylesMaterialUi/StylesMaterialUi";
import { useDash } from "../../Context/DashContext";
import axios from "axios";
import firebase from "firebase";
import { Image } from "cloudinary-react";

const PictureAndAddFounds = () => {
  const classes = useStyles();
  const {
    currentUser,
    userURL,
    imageNotFoundPicture,
    fileFromServer,
    userInfo,
    getUserInfo,
    openGoalModal,
  } = useDash();

  return (
    <div className={styles.pictureAndAddFounds}>
      {userURL === null || userURL.length < 1 ? (
        <div className={styles.boxImage}>
          <img src={imageNotFoundPicture} className={styles.image} />
        </div>
      ) : (
        <div className={styles.boxImage}>
          <Image
            cloudName="hrfhxbqio"
            className={styles.image}
            publicId={userURL.toString()}
            width="300"
            crop="scale"
          /> 
        </div>
      )}

      <Button
        onClick={openGoalModal}
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
