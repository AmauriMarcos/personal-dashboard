import React, { useState } from "react";
import styles from "./Settings.module.css";
import { Button, TextField, Grid } from "@material-ui/core";
import { useStyles } from "../../StylesMaterialUi/StylesMaterialUi";
import {useDash} from '../Context/DashContext';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import firebase from 'firebase';

const Settings = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const {currentUser} = useDash();
  const history = useHistory();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        setFile(selectedFile);
      } else {
        setFile(null);
        setError("Please select an image file (png or jpg)");
      }
    }
  };

  const submitChanges = async () => {
    if(currentUser){
      const token = await firebase.auth().currentUser.getIdToken();
      const fileData = file.name
      try{
        await axios.post("http://localhost:8080/settings", fileData,{
          headers: {
            "Content-Type": "application/json",      
            Authorization: token,
          },
        })
  
        history.push("/dashboard");
      }
      catch{
        console.log("Something went wrong!");
      }
    }
   
};    

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
            <div className={styles.boxProfile}>
              <img
                className={styles.profile}
                src="https://d3n8a8pro7vhmx.cloudfront.net/imaginebetter/pages/313/meta_images/original/blank-profile-picture-973460_1280.png?1614051091"
                alt="profile picture"
              />
            </div>
          </div>
          <div className={styles.boxLabelAndSelectedImage}>
            <label className={styles.label}>
              <input type="file" onChange={handleChange} />
              Upload File
            </label>
            {file && <p className={styles.selectedFile}>{file.name}</p>}           
          </div>
        </div>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                className={classes.editInput}
                type="text"
                label="First name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                className={classes.editInput}
                type="text"
                label="Last name"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                className={classes.editInput}
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
          onClick={submitChanges}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
