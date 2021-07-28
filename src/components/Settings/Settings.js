import React, { useState } from "react";
import styles from "./Settings.module.css";
import { Button, TextField, Grid, FilledInput } from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import { useDash } from "../Context/DashContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
import { Image } from "cloudinary-react";

const Settings = () => {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const {
    userURL,
    imageNotFoundPicture,
    handleChange,
    uploadImage,
    fileFromServer,
  } = useDash();
  const history = useHistory();
  const [fileName, setFileName] = useState(null);

  return (
    <div className={styles.Settings}>
      <h2 className={styles.SettingsTitle}>Account</h2>
      <div className={styles.SettingsContent}>
        <div className={styles.boxProfileAndButtons}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3 className={styles.avatarTitle}>Avatar</h3>

            {userURL === null || userURL.length < 1 ? (
              <div className={styles.boxProfile}>
                <img
                  className={styles.profile}
                  src={imageNotFoundPicture}
                  alt="profile picture"
                />
              </div>
            ) : (
              <div className={styles.boxProfile}>
                <Image
                  cloudName="hrfhxbqio"
                  className={styles.profile}
                  publicId={userURL.toString()}
                  width="300"
                  crop="scale"
                />
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className={styles.boxLabelAndSelectedImage}>
              {/*  <label className={styles.label}>
              <input type="file" onChange={handleChange} />
               Choose File
            </label> */}
              <form onSubmit={uploadImage} className={styles.formUploadImage}>
                <input type="file" name="avatar" onChange={handleChange} />
                <Button variant="contained" color="primary" type="submit">
                  Upload
                </Button>
              </form>
            </div>
          </div>
        </div>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
              InputProps={{
                className: classes.editInput,
              }}
              InputLabelProps={{
                style: { color: "rgb(158, 158, 158)" },
              }}
                variant="outlined"
             /*    className={classes.editInput} */
                type="text"
                label="First name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              InputProps={{
                className: classes.editInput,
              }}
              InputLabelProps={{
                style: { color: "rgb(158, 158, 158)" },
              }}
                variant="outlined"
              /*   className={classes.editInput} */
                type="text"
                label="Last name"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
              fullWidth
              InputProps={{
                className: classes.editInput,
              }}
              InputLabelProps={{
                style: { color: "rgb(158, 158, 158)" },
              }}
                variant="outlined"
               /*  className={classes.editInput} */
                type="email"
                label="Email"
              />
            </Grid>
          </Grid>
        </form>
        <Button
          variant="contained"
          className={classes.editButton}
          size="medium"
          color="primary"
          type="submit"
          /* onClick={submitChanges} */
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
