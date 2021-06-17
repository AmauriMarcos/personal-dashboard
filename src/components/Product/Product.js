import React from "react";
import styles from "./Product.module.css";
import iPhonePic from "../../assets/iPhonePic.svg";

const Product = () => {
  return (
    <div className={styles.Product}>
      <div className={styles.content}>
        <h2>The best way for managing your<br></br> money</h2>
        <p>
          It is easy to keep track of your receipts and payments, income and
          outcome in one financial dashboard.{" "}
        </p>
        <button>Try for free</button>
      </div>
      <div className={styles.image}>
        <img src={iPhonePic} alt="iPad" />
      </div>
    </div>
  );
};

export default Product;
