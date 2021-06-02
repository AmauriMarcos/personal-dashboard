import React from "react";
import styles from "./Hero.module.css";
import manWork from '../../assets/manWork.png'

const Hero = () => {
  return (
    <div className={styles.Hero}>
      <div className={styles.blocText}>
        <h1>
          The best solution for your <br></br>personal finances
        </h1>
        <p>
          Set goals and use charts to visualize<br></br> the data that matters
          to you
        </p>
        <button>
            Get Started
        </button>
      </div>
      <div className={styles.blocImg}>
          <img src={manWork} alt="man working"/>
      </div>
    </div>
  );
};

export default Hero;
