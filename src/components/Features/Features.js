import React from "react";
import styles from "./Features.module.css";
import backgroundLeft from '../../assets/featuresBackgroundLeft.svg';
import backgroundRight from '../../assets/featuresBackgroundRight.svg'
import { StyleSharp } from "@material-ui/icons";
import { useMediaQuery } from "react-responsive";
import { Image } from "cloudinary-react";
import {Link} from 'react-router-dom';

const Features = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 420px)`}); 


  let featuresBackgroundLeftImg = null;

  if(isMobile){
    featuresBackgroundLeftImg = (
      <Image cloudName="hrfhxbqio" className={styles.backgroundLeft} publicId="newMobilefeaturesBackgroundLeft_c4w690.jpg" ></Image>
    )
  }else{
    featuresBackgroundLeftImg =(
      <Image cloudName="hrfhxbqio" className={styles.backgroundLeft} publicId="newfeaturesBackgroundLeft_jwelld.jpg" ></Image>
    )
  }

  let featuresBackgroundRightImg = null;

  if(isMobile){
    featuresBackgroundRightImg = (
      <Image cloudName="hrfhxbqio" className={styles.backgroundRight}publicId="newMobileBackgroundRight_s0jshv.jpg"></Image>
    )
  }else{
    featuresBackgroundRightImg =(
      <Image cloudName="hrfhxbqio" className={styles.backgroundRight}publicId="newBackgroundRight_ggzxti.jpg" ></Image>
    )
  }

  return (
    <div className={styles.Features}>
      <div className={styles.left}>
        <div className={styles.boxImage}>
           {featuresBackgroundLeftImg}
        </div>

        <div className={styles.content}>
          <h2>The best solution for your personal finances</h2>
          <p>
            Set goals and use charts to visualize the data tha t matters to you. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link to="/login">
             <button>Go to dashboard</button>
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.content}>
          <h2>The best solution for your personal finances</h2>
          <p>
            Set goals and use charts to visualize the data tha t matters to you. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link to="/login">
             <button>Get started</button>
          </Link>
        </div>
        <div className={styles.boxImage}>
           {featuresBackgroundRightImg}
        </div>
      </div>
    </div>
  );
};

export default Features;
