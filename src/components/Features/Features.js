import React from "react";
import styles from "./Features.module.css";
import backgroundLeft from '../../assets/featuresBackgroundLeft.svg';
import backgroundRight from '../../assets/featuresBackgroundRight.svg'
import { StyleSharp } from "@material-ui/icons";

const Features = () => {
  return (
    <div className={styles.Features}>
      <div className={styles.left}>
        <div className={styles.boxImage}>
          <img  className={styles.backgroundLeft} src={ backgroundLeft}/>  
        </div>

        <div className={styles.content}>
          <h2>The best solution<br></br> for your personal<br></br> finances</h2>
          <p>
            Set goals and use charts to visualize the data tha t matters to you
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.content}>
          <h2>The best solution<br></br> for your personal<br></br> finances</h2>
          <p>
            Set goals and use charts to visualize the data tha t matters to you
          </p>
        </div>
        <div className={styles.boxImage}>
          <img  className={styles.backgroundRight} src={ backgroundRight}/>
        </div>
      </div>
    </div>
  );
};

export default Features;
