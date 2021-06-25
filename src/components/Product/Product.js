import React from "react";
import styles from "./Product.module.css";
import iPhonePic from "../../assets/iPhonePic.svg";
import { useMediaQuery } from "react-responsive";
import { Image } from "cloudinary-react";
import {Link} from 'react-router-dom';
const Product = () => {
 const isMobile = useMediaQuery({ query: `(max-width: 420px)`}); 
  let productImg = null;

  if(isMobile){
    productImg = (
      <Image cloudName="hrfhxbqio" publicId="iPhonePicMobile_wk4lps.jpg"  ></Image>
    )
  }else{
    productImg =(
      <Image cloudName="hrfhxbqio" publicId="iPhonePic_e1ee3l.jpg" ></Image>
    )
  }

  return (
    <div className={styles.Product}>
      <div className={styles.content}>
        <h2>The best way for managing your money</h2>
        <p>
          It is easy to keep track of your receipts and payments, income and
          outcome in one financial dashboard. Set goals and use charts to visualize the data tha t matters to you. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <Link to="/login" className={styles.wrapperButton}>
          <button>Try for free</button>
        </Link>
      </div>
      <div className={styles.image}>
        {productImg}
      </div>
    </div>
  );
};

export default Product;
